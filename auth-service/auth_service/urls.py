from django.contrib import admin
from django.urls import path, include
from accounts.views import PasswordResetView, PasswordResetConfirmView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),  # Connect auth routes
    path('auth/reset-password/', PasswordResetView.as_view(), name='reset_password'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password'),] 
