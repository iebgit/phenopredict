# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def validate_email(self, value):
        """
        Check if the email already exists in the database and ensure valid email format.
        """
        validate_email(value)  # Ensure the email is in a valid format

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        
        return value

    def validate_password(self, value):
        """
        Validate password strength and ensure it meets security standards.
        """
        validate_password(value)  # Use Django's built-in password validators
        return value

    def create(self, validated_data):
        # Create a new user using email as the unique identifier (username)
        user = User.objects.create_user(
            username=validated_data['email'],  # Set email as the username
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.is_active = False  # Set user as inactive until email is verified
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            # Try to fetch the user by email, not username
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password')

            # Authenticate the user
            user = authenticate(username=user.username, password=password)
            if user:
                return user
            raise serializers.ValidationError('Invalid email or password')
        raise serializers.ValidationError('Must include "email" and "password"')
    


class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    def save(self, user):
        user.set_password(self.validated_data['new_password'])
        user.save()