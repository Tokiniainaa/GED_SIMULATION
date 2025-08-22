from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DocumentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Document
from rest_framework import parsers


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class DocumentListCreate(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    # ✅ Pour accepter uniquement les documents de l'utilisateur connecté
    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(owner=user)

    # ✅ Support des fichiers
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    # ✅ perform_create ne vérifie plus is_valid() car DRF a déjà validé le serializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DocumentDelete(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(owner=user)
