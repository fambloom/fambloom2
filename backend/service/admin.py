from django.contrib import admin

# Register your models here.
from .models import Person, Tree

class PersonAdmin(admin.ModelAdmin):
    list_display = ('firstName', 'lastName', 'bio', 'gender', 'birthPlace')

class TreeAdmin(admin.ModelAdmin):
    list_display = ( 'treeCode', 'treeName', 'password')

# Register your models here.

admin.site.register(Person, PersonAdmin)
admin.site.register(Tree, TreeAdmin)