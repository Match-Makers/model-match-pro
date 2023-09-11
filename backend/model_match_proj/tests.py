from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser

class URLTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_admin_url(self):
        # Assuming you need to be logged in to access the admin
        # If you have a custom user model adjust accordingly
        self.user = CustomUser.objects.create_user(username='testusertest', password='testpass')
        self.user.is_staff = True
        self.user.save()
        self.client.login(username='testusertest', password='testpass')
        response = self.client.get(reverse('admin:index'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_obtain_pair(self):
        # Create a user to obtain a token
        self.user = CustomUser.objects.create_user(username='testusertest', password='testpass')
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testusertest', 'password': 'testpass'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)

    def test_token_refresh(self):
        # Obtain a token first
        self.user = CustomUser.objects.create_user(username='testusertest', password='testpass')
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testusertest', 'password': 'testpass'})
        refresh_token = response.data['refresh']

        # Now refresh it
        response = self.client.post(reverse('token_refresh'), {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)

    def test_user_registration(self):
        # Register a new user
        data = {'username': 'newuser', 'password': 'newpass'}
        response = self.client.post(reverse('create_user'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(CustomUser.objects.filter(username='newuser').exists())
