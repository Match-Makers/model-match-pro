from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .models import LLM, Prompt, Responses
from .permissions import IsOwnerOrReadOnly
from .serializers import LLMSerializer, PromptSerializer, ResponsesSerializer

from rest_framework import status
import httpx
from concurrent.futures import ThreadPoolExecutor

from django.conf import settings

if not settings.API_TOKEN:
    raise ValueError("API_TOKEN is not set in .env file.")


class LLMAPIClient:
    BASE_API_URL = "https://api-inference.huggingface.co/models/"

    def __init__(self, api_token):
        self.headers = {"Authorization": f"Bearer {api_token}"}
        self.client = httpx.Client()

    def make_api_call(self, api_code, input_str, timeout=500):
        api_url = f"{self.BASE_API_URL}{api_code}"
        payload = {"inputs": input_str}

        print(f"Making API call to {api_url} with query: {input_str}")
        response = self.client.post(
            api_url, headers=self.headers, json=payload, timeout=timeout)
        print(f"Received status code {response.status_code} from {api_url}")

        if response.status_code == 302:
            redirect_url = response.headers.get('Location')
            print("Redirecting to:", redirect_url)
            error_message = f"Redirecting to: {redirect_url}"
            return None, error_message

        if response.status_code != 200:
            error_message = f"API call failed for model {api_code} with status code {response.status_code}: {response.text}"
            return None, error_message

        api_response = response.json()
        return api_response, None


llm_api_client = LLMAPIClient(settings.API_TOKEN)

# lists and creates prompts


class PromptList(ListCreateAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = PromptSerializer

    def get_queryset(self):
        user = self.request.user
        return Prompt.objects.filter(user_id=user)

    def create(self, request, *args, **kwargs):
        print("Creating a new prompt...")
        response = super(PromptList, self).create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            prompt_id = response.data.get('id')
            prompt_instance = Prompt.objects.get(pk=prompt_id)
            print("Fetched Prompt instance:", prompt_instance)
            self.create_responses(prompt_instance, request, *args, **kwargs)
        return response

    def create_responses(self, prompt, request, *args, **kwargs):
        print("Type of 'prompt' parameter:", type(prompt))
        print("Value of 'prompt' parameter:", prompt)
        print("Creating responses for the prompt...")
        input_str = prompt.input_str
        lang_models = prompt.lang_models

        # Fetch all required LLM objects at once
        lang_model_objects = {
            lm.id: lm for lm in LLM.objects.filter(pk__in=lang_models)}

        print("About to enter the loop with lang_models:", lang_models)

        def fetch_create_response(model_id):
            lang_model = lang_model_objects[model_id]
            print("Processing lang_model with ID:", model_id,
                  "and API code:", lang_model.api_code)
            api_response, error = llm_api_client.make_api_call(
                lang_model.api_code, input_str)

            if api_response:
                Responses.objects.create(
                    prompt_id=prompt, lang_model_id=lang_model, response=api_response[0]['generated_text'])
                # Append the response to the list
                return api_response[0]['generated_text']
            else:
                return error

        # Use ThreadPoolExecutor to run API calls in parallel
        with ThreadPoolExecutor(max_workers=len(lang_models)) as executor:
            results = list(executor.map(fetch_create_response, lang_models))

        # Separate results into responses and errors
        api_responses_list = [result for result in results if not isinstance(
            result, str) or 'error' not in result]
        error_messages = [result for result in results if isinstance(
            result, str) and 'error' in result]

        if error_messages:
            custom_data = {
                'status': 'Some models did not return results.',
                'errors': error_messages
            }
            prompt.error_messages = custom_data

        print(api_responses_list)


class PromptDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = PromptSerializer

    def get_queryset(self):
        user = self.request.user
        return Prompt.objects.filter(user_id=user)


class ResponseList(ListAPIView):  # lists responses specific to a single prompt
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = ResponsesSerializer

    def get_queryset(self):
        user = self.request.user
        prompt_pk = self.kwargs['pk']
        return Responses.objects.filter(prompt_id__user_id=user, prompt_id=prompt_pk)


class LLMList(ListAPIView):
    queryset = LLM.objects.all()
    serializer_class = LLMSerializer
