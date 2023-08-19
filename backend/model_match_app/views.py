from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .models import LLM, Prompt, Responses
from .permissions import IsOwnerOrReadOnly
from .serializers import LLMSerializer, PromptSerializer, ResponsesSerializer


class PromptList(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = PromptSerializer

    def get_queryset(self):
        user = self.request.user
        return Prompt.objects.filter(user_id=user)


class ResponseDetail(ListAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = ResponsesSerializer

    def get_queryset(self):
        user = self.request.user
        return Responses.objects.filter(user_id=user)


class LLMList(ListAPIView):
    queryset = LLM.objects.all()
    serializer_class = LLMSerializer
