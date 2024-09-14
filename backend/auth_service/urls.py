from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import PasswordResetView, PasswordResetConfirmView, ResendVerificationEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),  # Auth routes are already connected here
    path('auth/reset-password/', PasswordResetView.as_view(), name='reset_password'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password'),
    path('auth/resend-verification/', ResendVerificationEmailView.as_view(), name='resend_verification'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('genetic/', include('genetic_data.urls')),  # Genetic data routes
]
