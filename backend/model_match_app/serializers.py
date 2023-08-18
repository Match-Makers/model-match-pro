from rest_framework import serializers
from .models import LLM, Prompt, Responses

class LLMSerializer(serializers.ModelSerializer):
    class Meta:
        model = LLM
        fields = '__all__'

class ResponsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responses
        fields = '__all__'

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = '__all__'