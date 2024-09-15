from django.urls import path
from .views import UploadGeneticDataView, GenerateSignedURLView, ListUserFilesView, DeleteFileView

urlpatterns = [
    path('upload-genetic-data/', UploadGeneticDataView.as_view(), name='upload_genetic_data'),
    path('file/<int:file_id>/signed-url/', GenerateSignedURLView.as_view(), name='generate_signed_url'),
    path('files/', ListUserFilesView.as_view(), name='list_user_files'),  # Add this line
    path('file/<int:file_id>/delete/', DeleteFileView.as_view(), name='delete_file'),  # Add this line

]