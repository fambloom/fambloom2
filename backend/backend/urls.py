"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from django.views.generic import TemplateView
from service import views


router = routers.DefaultRouter()
router.register(r'person', views.PersonView, 'person')
router.register(r'tree', views.TreeView, 'tree')
router.register(r'treedetail', views.TreeDetailView, 'treedetail')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('uppercase_text', views.uppercase_text, name='uppercase_text'),
    path('api/', include(router.urls)),
    re_path(".*", TemplateView.as_view(template_name="index.html")),

]
