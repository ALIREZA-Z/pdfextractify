import os
from django.conf import settings
from django.utils.text import get_valid_filename
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

@method_decorator(csrf_exempt, name='dispatch')
class FileUploadView(APIView):
    def post(self, request, format=None):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # File size restriction
        max_size = 1024 * 100  # 100 KB default
        if request.user and request.user.is_authenticated:
            max_size = 1024 * 1024  # 1 MB for signed-in users

        if file.size > max_size:
            readable_limit = f"{max_size // 1024} KB"
            return Response(
                {"error": f"File too large. Max allowed size is {readable_limit}."},
                status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE
            )

        # File type restriction: only PDFs
        if file.content_type != "application/pdf":
            return Response(
                {"error": "Invalid file type. Only PDF files are allowed."},
                status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
            )

        # ✅ Save the file to media/uploads/
        safe_name = get_valid_filename(file.name)
        upload_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, safe_name)

        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        return Response({"filename": safe_name}, status=status.HTTP_201_CREATED)
