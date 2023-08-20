from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.test import TransactionTestCase

from .models import LLM, Prompt, Responses

#uses transactions instead of test cases so that each test runs its own transaction
#each test wrapped in a transaction and rolled back at the end so that the database is not impacted
class ViewTests(TransactionTestCase):

    def setUp(self):
        self.client = APIClient()

        # Check if user exists, otherwise create
        self.user, created = get_user_model().objects.get_or_create(
            username='testuser',
            defaults={'password': 'testpass'}
        )
        if created:
            self.user.set_password('testpass')
            self.user.save()

        # Create a LLM instance
        self.llm = LLM.objects.create(
            name='Test LLM',
            api_code='test_code'
        )

        # Create a Prompt instance
        self.prompt = Prompt.objects.create(
            user_id=self.user,
            input_str="Test input"
        )

        # Create a Responses instance
        self.response = Responses.objects.create(
            prompt_id=self.prompt,
            lang_model_id=self.llm,
            response='Test response'
        )

    def test_prompt_list(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Make a GET request
        response = self.client.get(reverse('prompt_list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_prompt_detail(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('prompt_detail', kwargs={'pk': self.prompt.id}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['input_str'], self.prompt.input_str)


    def test_response_list(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('response_list', kwargs={'pk': self.prompt.id}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_llm_list(self):
        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('llm_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

   #clean up method
    def tearDown(self):
        Prompt.objects.filter(user_id=self.user.id).delete()
        super().tearDown()

