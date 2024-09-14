from google.cloud import storage
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SNPFile
import os

class UploadGeneticDataView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file = request.FILES.get('file')
        user = request.user  # Get the authenticated user

        if not file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        try:
            # Initialize Google Cloud client and specify the bucket
            client = storage.Client()
            bucket = client.bucket(os.getenv('GCLOUD_STORAGE_BUCKET'))

            # Proceed with the upload
            blob = bucket.blob(file.name)
            blob.upload_from_file(file, content_type=file.content_type)

            # Save file metadata to the database
            snp_file = SNPFile.objects.create(
                user=user,
                file_url=blob.public_url  # Store the URL to the file
            )

            return JsonResponse({"message": "File uploaded successfully", "file_url": snp_file.file_url}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)