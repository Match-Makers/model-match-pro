from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    #be able to read json and save a new user
    #if we add functionality to view all users, can't expose even the hash
    #password field is written to but not read from
    password = serializers.CharField(write_only = True)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password) #adds in encrypted password
        user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password')