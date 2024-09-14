from django.db import models
from django.contrib.auth.models import User

class SNPFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)