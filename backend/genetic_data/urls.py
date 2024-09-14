from django.urls import path
from .views import UploadGeneticDataView

urlpatterns = [
    path('upload-genetic-data/', UploadGeneticDataView.as_view(), name='upload_genetic_data'),
]