# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


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
        Check if the email already exists in the database.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        # Create a new user using email as the unique identifier (username)
        user = User.objects.create_user(
            username=validated_data['email'],  # Set email as the username
            email=validated_data['email'],
            password=validated_data['password']
        )
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
                user = User.objects.get(email=email)  # Get the user by email
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password')

            # Authenticate the user using the username and password
            user = authenticate(username=user.username, password=password)
            if user:
                return user
            raise serializers.ValidationError('Invalid email or password')
        raise serializers.ValidationError('Must include "email" and "password"')