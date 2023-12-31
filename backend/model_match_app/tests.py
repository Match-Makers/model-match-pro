import requests_mock
from .views import make_api_call
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.test import TransactionTestCase, TestCase

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

    def test_delete_prompt(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(reverse('prompt_detail', kwargs={'pk': self.prompt.id}))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Prompt.objects.filter(id=self.prompt.id).exists())
        self.assertFalse(Responses.objects.filter(prompt_id=self.prompt.id).exists())

    #clean up method
    def tearDown(self):
        Prompt.objects.filter(user_id=self.user.id).delete()
        LLM.objects.filter(name='Test LLM').delete()
        super().tearDown()


#tests mock response from Huggingface API
class HuggingFaceApiCallTestCase(TestCase):
    def test_hugging_face_api_call(TestCase):
        mock_response = [
            {
                "generated_text": "can you please let us know more details about your experience?`,\n    },\n    {\n      question:"
            }
        ]

        with requests_mock.Mocker() as mock:
            mock.post("https://api-inference.huggingface.co/models/Deci/DeciCoder-1b", json=mock_response, status_code=200)

            api_code = "Deci/DeciCoder-1b"
            query = "can you please let us know more details about your"

            response, error = make_api_call(api_code,query)

            print(error)
            print(response)
            assert response is not None
            assert error is None
            assert 'generated_text' in response[0]
            assert response[0][
                   'generated_text'] == "can you please let us know more details about your experience?`,\n    },\n    {\n      question:"

    def test_invalid_hugging_face_api_call(self):
        with requests_mock.Mocker() as mock:
            mock.post("https://api-inference.huggingface.co/models/Deci/InvalidCode", json={"error": "Invalid code"}, status_code=400)
            api_code = "Deci/InvalidCode"
            query = "can you provide more information?"
            response, error = make_api_call(api_code, query)
            assert response is None
            assert error is not None


