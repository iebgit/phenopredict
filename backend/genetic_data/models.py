from django.db import models
from django.contrib.auth.models import User

class SNPFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_url = models.CharField(max_length=255)  # Store the path to the file
    uploaded_at = models.DateTimeField(auto_now_add=True)