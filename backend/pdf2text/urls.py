from django.urls import path
from .views import PDFTextView

urlpatterns = [
    path("", PDFTextView.as_view(), name="pdf-to-text"),
]
