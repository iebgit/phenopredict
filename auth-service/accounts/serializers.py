# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
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