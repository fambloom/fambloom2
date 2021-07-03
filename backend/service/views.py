
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from .serializers import PersonSerializer, TreeSerializer, TreeDetailSerializer, PersonDetailSerializer, PersonDetailRelativeSerializer
from .models.models import Person, Tree
from django.db.models import Count
from django.http import JsonResponse

# Create your views here.

class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

class PersonDetailRelativeView(viewsets.ModelViewSet):
    serializer_class = PersonDetailRelativeSerializer
    queryset = Person.objects.all()

class PersonDetailView(viewsets.ModelViewSet):
    serializer_class = PersonDetailSerializer
    queryset = Person.objects.all()

class TreeView(viewsets.ModelViewSet):
    serializer_class = TreeSerializer
    queryset = Tree.objects.all()

class TreeDetailView(viewsets.ModelViewSet):
    serializer_class = TreeDetailSerializer
    queryset = Tree.objects.all()

def countWomen(request):
    count = Person.objects.filter(gender="female").count()
    return JsonResponse({"women": count})

def countMen(request):
    count = Person.objects.filter(gender="male").count()
    return JsonResponse({"men": count})


def uppercase_text(request):
    text = request.GET.get("text", "")
    return JsonResponse({"uppercase_text": text.upper()})
