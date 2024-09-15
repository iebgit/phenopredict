from google.cloud import storage
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SNPFile
from django.shortcuts import get_object_or_404
import os
from datetime import timedelta
from rest_framework.response import Response
import logging

# Configure logging
logger = logging.getLogger(__name__)

class UploadGeneticDataView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file = request.FILES.get('file')
        user = request.user  # Get the authenticated user

        if not file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        try:
            # Initialize Google Cloud client and specify the bucket
            client = storage.Client()  # Automatically uses GOOGLE_APPLICATION_CREDENTIALS
            bucket = client.bucket(os.getenv('GCLOUD_STORAGE_BUCKET'))

            # Proceed with the upload
            blob = bucket.blob(f'{user.id}/{file.name}')  # Store with user ID to organize files
            blob.upload_from_file(file, content_type=file.content_type)

            # Save file metadata to the database
            snp_file = SNPFile.objects.create(
                user=user,
                file_url=blob.name  # Store only the file path
            )

            logger.info(f"File {file.name} uploaded successfully for user {user.id}")

            return JsonResponse({"message": "File uploaded successfully", "file_url": snp_file.file_url}, status=201)

        except Exception as e:
            logger.error(f"Error during file upload: {e}")
            return JsonResponse({"error": str(e)}, status=400)
        

class GenerateSignedURLView(APIView):
    def get(self, request, file_id, format=None):
        user = request.user
        snp_file = get_object_or_404(SNPFile, id=file_id, user=user)

        try:
            if not snp_file.file_url:
                logger.warning(f"User {user.id} attempted to access invalid file path")
                return JsonResponse({"error": "Invalid file path"}, status=400)

            # Initialize Google Cloud client and specify the bucket
            client = storage.Client()  # Automatically uses GOOGLE_APPLICATION_CREDENTIALS
            bucket = client.bucket(os.getenv('GCLOUD_STORAGE_BUCKET'))
            blob = bucket.blob(snp_file.file_url)

            # Generate signed URL with content disposition for download
            signed_url = blob.generate_signed_url(
                expiration=timedelta(minutes=15),
                method='GET',
                response_disposition=f'attachment; filename={snp_file.file_url.split("/")[-1]}'
            )

            logger.info(f"Generated signed URL for file {snp_file.file_url} for user {user.id}")

            return JsonResponse({"signed_url": signed_url}, status=200)

        except Exception as e:
            logger.error(f"Error during signed URL generation: {e}")
            return JsonResponse({"error": str(e)}, status=400)
        

class ListUserFilesView(APIView):
    def get(self, request):
        user = request.user  # Get the authenticated user
        try:
            files = SNPFile.objects.filter(user=user)  # Filter files by user
            file_list = [{"id": file.id, "file_name": file.file_url.split('/')[-1]} for file in files]  # Create a list of files

            logger.info(f"Listed files for user {user.id}")

            return Response({"files": file_list})
        except Exception as e:
            logger.error(f"Error during file listing for user {user.id}: {e}")
            return JsonResponse({"error": str(e)}, status=400)
        
class DeleteFileView(APIView):
    def delete(self, request, file_id, format=None):
        user = request.user
        snp_file = get_object_or_404(SNPFile, id=file_id, user=user)

        try:
            # Initialize Google Cloud client and specify the bucket
            client = storage.Client()
            bucket = client.bucket(os.getenv('GCLOUD_STORAGE_BUCKET'))
            blob = bucket.blob(snp_file.file_url)

            # Delete the file from Google Cloud Storage
            blob.delete()

            # Delete the file entry from the database
            snp_file.delete()

            logger.info(f"Deleted file {snp_file.file_url} for user {user.id}")

            return JsonResponse({"message": "File deleted successfully"}, status=200)

        except Exception as e:
            logger.error(f"Error during file deletion: {e}")
            return JsonResponse({"error": str(e)}, status=400)