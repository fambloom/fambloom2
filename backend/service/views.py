from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import PersonSerializer, TreeSerializer, TreeDetailSerializer
from .models import Person, Tree

# Create your views here.

class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

class TreeView(viewsets.ModelViewSet):
    serializer_class = TreeSerializer
    queryset = Tree.objects.all()

class TreeDetailView(viewsets.ModelViewSet):
    serializer_class = TreeDetailSerializer
    queryset = Tree.objects.all()

def uppercase_text(request):
    text = request.GET.get("text", "")

    return JsonResponse({"uppercase_text": text.upper()})
