from rest_framework import serializers
from .models.models import Person, Tree



class PersonDetailRelativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'firstName', 'lastName', 'gender', 'tree' )


class PersonDetailSerializer(serializers.ModelSerializer):
    parents = PersonDetailRelativeSerializer(many=True, allow_null=True, required=False)
    siblings = PersonDetailRelativeSerializer(many=True, allow_null=True, required=False)
    spouses = PersonDetailRelativeSerializer(many=True, allow_null=True, required=False)
    children = PersonDetailRelativeSerializer(many=True, allow_null=True, required=False)
    class Meta:
        model = Person
        fields = ('id', 'firstName', 'lastName', 'gender', 
        'tree', 'parents', 'siblings', 'spouses', 'children',
        'bio', 'birthDate', 'birthPlace', 'image')


# class PersonIDSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Person
#         fields = ('id')

class PersonSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Person
        fields = ('id', 'firstName', 'lastName', 'gender', 
        'tree', 'parents', 'siblings', 'spouses', 'children',
        'bio', 'birthDate', 'birthPlace', 'image')


class TreeDetailSerializer(serializers.ModelSerializer):
    people = PersonSerializer(many=True, allow_null=True, required=False)
    class Meta:
        model = Tree
        fields = ('treeCode', 'treeName', 'password', 'people', 'description', 'image')

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = ('treeCode', 'treeName', 'password', 'description', 'image')
