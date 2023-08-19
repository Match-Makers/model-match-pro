from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer

from .forms import CustomUserCreationForm


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


class CustomUserCreate(APIView):
    # anyone can register
    authentication_classes = ()
    permission_classes = ()

    # method is invoked when the user makes a POST
    # request to api/ register
    def post(self, request):
        # use serializer to validate it
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            # now save the user
            user = serializer.save()
            # if this works, user will be truthy
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


