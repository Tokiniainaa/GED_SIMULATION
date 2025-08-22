from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Document


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'content', 'file',
                  'created_at', 'updated_at', 'owner']
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'file': {'required': False},
                        'owner': {'read_only': True}}
