# pdf2text/views.py
import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .pdf_utils import extract_text_from_pdf

class PDFTextView(APIView):
    def get(self, request):
        filename = request.query_params.get("filename")
        if not filename:
            return Response({"error": "Filename required"}, status=status.HTTP_400_BAD_REQUEST)

        file_path = os.path.join(settings.MEDIA_ROOT, "uploads", filename)
        if not os.path.exists(file_path):
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            text = extract_text_from_pdf(file_path)
            return Response({"text": text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
