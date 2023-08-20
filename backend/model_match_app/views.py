import asyncio

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

import environ
env =environ.Env()
environ.Env.read_env()

API_TOKEN= env("API_TOKEN", default=None)

if not API_TOKEN:
    raise ValueError("API_TOKEN is not set in .env file.")

HEADERS ={"Authorization": f"Bearer {API_TOKEN}"}
BASE_API_URL = "https://api-inference.hugglingface.co/models/"

async def make_api_call(api_code,query):
    #construct the complete API URL using the model's api_code
    api_url = f"{BASE_API_URL}{api_code}"
    #build the payload per docs
    payload = {"inputs": query}
    async with httpx.AsyncClient() as client:
    #make the api request
        response = await client.post(api_url, headers=HEADERS, json=payload)

    #error handling
    if response.status_code != 200:
        error_message = f"API call failed for model {api_code} with status code {response.status_code}: {response.text}"
        return None, error_message

    return response.json(), None


# lists and creates prompts
class PromptList(ListCreateAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = PromptSerializer

    def get_queryset(self):
        user = self.request.user
        return Prompt.objects.filter(user_id=user)

    def create(self, request, *args, **kwargs):
        response = super(PromptList, self).create(request, *args, **kwargs)
        #if the prompt is successful
        if response.status_code == status.HTTP_201_CREATED:
            loop = asyncio.get_running_loop()
            loop.run_until_complete(self.async_create(response, request, *args, **kwargs))
        return response

    async def async_create(self,response, request, *args, **kwargs):

            prompt = self.object
            #to collect error messages
            error_messages = []

            for model_id in prompt.lang_models:
                lang_model = LLM.objects.get(pk=model_id)

                #use prompt.input_str as the query to be sent to the api
                api_response, error = await make_api_call(lang_model.api_code, prompt.input_str)

                #save the response
                #api_response['generated_text'] per the actual structure of huggingface
                if api_response:
                    Responses.objects.create(prompt_id=prompt, lang_model_id=lang_model, response=api_response['generated_text'])
                else:
                    error_messages.append(error)
            #if any of the models have issues, returns a summary message, and a list of error messages for the individual models, otherwise return normally
            if error_messages:
                custom_data = {
                    'status': 'Some models did not return results.',
                    'errors': error_messages
                }
                response.data.update(custom_data)


#allows user to edit individual responses
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
