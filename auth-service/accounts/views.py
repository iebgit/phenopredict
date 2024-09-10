from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str  # Correct import
from django.contrib.auth import update_session_auth_hash
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache  # Use Django's cache system for failed attempts
from .serializers import RegisterSerializer, LoginSerializer, PasswordResetConfirmSerializer, UserProfileSerializer, ChangePasswordSerializer, UpdateEmailSerializer 



# Helper function to send verification email
def send_verification_email(user, request):
    uid = urlsafe_base64_encode(force_bytes(user.pk))  # Encode the user's primary key
    token = default_token_generator.make_token(user)   # Generate token for user verification
    verification_url = f"{request.scheme}://{request.get_host()}/auth/verify/{uid}/{token}/"
    
    # Send the verification email
    send_mail(
        'Verify your email address',
        f'Click the link to verify your email: {verification_url}',
        'noreply@phenopredict.com',  # Change this to your actual email address
        [user.email],
        fail_silently=False,
    )

# Register a new user with email verification
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Allow public access to this view

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # Deactivate the user until they verify their email
            user.save()
            send_verification_email(user, request)  # Send verification email
            return Response({
                "message": "Registration successful. Please check your email to verify your account."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Email verification view
class VerifyEmailView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(User, pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True  # Activate the user
            user.save()
            return Response({
                "message": "Email successfully verified. You can now log in."
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Invalid token."
            }, status=status.HTTP_400_BAD_REQUEST)
            
class ResendVerificationEmailView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, email=email)

        if user.is_active:
            return Response({'error': 'This user is already active.'}, status=status.HTTP_400_BAD_REQUEST)

        # Resend the verification email
        send_verification_email(user, request)

        return Response({'message': 'Verification email has been resent.'}, status=status.HTTP_200_OK)


# Login view with JWT tokens
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if not user.is_active:
            return Response({"error": "Please verify your email before logging in."}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

# Get current user details
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = RegisterSerializer

    def get_object(self):
        return self.request.user
    

class PasswordResetView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        
        print("Received email:", email)  # Debugging statement to check if email is coming through
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
          
        user = get_object_or_404(User, email=email)

        # Generate token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Construct password reset URL
        reset_url = f"{request.scheme}://{request.get_host()}/reset-password/{uid}/{token}/"

        # Send password reset email
        send_mail(
            'Reset Your Password',
            f'Click the link to reset your password: {reset_url}',
            'noreply@phenopredict.com',
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
    
    
class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer  # Add the serializer class

    def post(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response({"message": "Password reset successful!"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid token or user."}, status=status.HTTP_400_BAD_REQUEST)
    
# User Profile Update View
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Change Password View
class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data['old_password']):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.data['new_password'])
            user.save()

            # Update session to prevent logout after password change
            update_session_auth_hash(request, user)

            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Email View
class UpdateEmailView(generics.GenericAPIView):
    serializer_class = UpdateEmailSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user.email = serializer.data['email']
            user.save()
            return Response({"message": "Email updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)