
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView

from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from .serializers import PersonSerializer, TreeSerializer, TreeDetailSerializer, PersonDetailSerializer, PersonDetailRelativeSerializer
from .models.models import Person, Tree
from django.db.models import Count
from django.http import JsonResponse
from rest_framework.response import Response
from django.http import Http404



# Create your views here.

class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

# class PersonView(APIView):

#     def get(self, request):
#         queryset = Person.objects.all()
#         serializer = PersonSerializer(queryset)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = PersonSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         thisPerson = self.get_object(pk)
#         serializer = PersonSerializer(thisPerson, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request, pk):
#         personA = self.get_object(pk)
#         serializer = PersonSerializer(personA, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @classmethod
#     def get_extra_actions(cls):
#         return []

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
