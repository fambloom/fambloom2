from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import SET_NULL
from django.db.models.fields import related
from django.utils.crypto import get_random_string
import string


class Tree(models.Model):
    def pkgen():
        code = get_random_string(10, allowed_chars=string.ascii_uppercase + string.digits)
        return code
    treeCode = models.CharField(max_length=11, primary_key=True, default=pkgen)
    treeName = models.CharField(max_length=120)
    password = models.CharField(max_length=64, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.CharField(max_length=200, blank=True, null=True)


class Person(models.Model):
    # essentials
    # code = get_random_string(10, allowed_chars=string.ascii_uppercase + string.digits)
    # myID = models.CharField(max_length=11, primary_key=True)
    
    tree = models.ForeignKey('Tree', related_name='people', on_delete=SET_NULL, blank=True, null=True)
    
    # parents = models.ManyToManyField('self', blank=True, symmetrical = False, through='ParentChildRel', through_fields=('parent','child'))
    # siblings = models.ManyToManyField('self', blank=True, through='SiblingRel')
    # spouses = models.ManyToManyField('self', blank=True, through='SpouseRel')
    parents = models.ManyToManyField('self', blank=True, symmetrical = False, related_name='+')
    children = models.ManyToManyField('self', blank=True, symmetrical = False, related_name='+')
    siblings = models.ManyToManyField('self', blank=True)
    spouses = models.ManyToManyField('self', blank=True)

    # from User
    firstName=models.CharField(max_length=120)
    lastName=models.CharField(max_length=120)
    GENDERS = (('female', 'female'), ('male', 'male'))
    gender=models.CharField(max_length=10, choices=GENDERS)

    # rendering
    bio=models.TextField(blank=True, null=True)
    birthDate=models.DateField(blank=True, null=True)
    birthPlace=models.CharField(max_length=100, blank=True, null=True)
    image=models.CharField(max_length=200, blank=True, null=True)

    def _str_(self):
        fullname = " ".join((self.firstName, self.lastName))
        return fullname
    

# class ParentChildRel(models.Model):
#     parent = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='children')
#     child = models.ForeignKey(Person, on_delete=models.CASCADE)
#     TYPES = (('blood', 'blood'), ('adopted', 'adopted'), )
#     type = models.CharField(max_length=10, choices=TYPES, blank=True, null=True)


# class SiblingRel(models.Model):
#     sibA = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='siA')
#     sibB = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='siB')
#     TYPES = (('blood', 'blood'), ('adopted', 'adopted'), ('half', 'half') )
#     type = models.CharField(max_length=10, choices=TYPES, blank=True, null=True)

# class SpouseRel(models.Model):
#     spoA = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='spA')
#     spoB = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='spB')
#     TYPES = (('married', 'married'), ('divorced', 'divorced') )
#     type = models.CharField(max_length=10, choices=TYPES, blank=True, null=True)