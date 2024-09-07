from django.urls import path
from .views import RegisterView, LoginView, UserDetailView, VerifyEmailView, ResendVerificationEmailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Registration route
    path('login/', LoginView.as_view(), name='login'),  # Login route
    path('me/', UserDetailView.as_view(), name='me'),  # Get current user details
    path('verify/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),  # Email verification route
    path('resend-verification/', ResendVerificationEmailView.as_view(), name='resend-verification'),  # Resend verification email
]