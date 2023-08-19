from django.urls import path
from .views import PromptList, ResponseDetail, LLMList

urlpatterns = [
    path("", LLMList.as_view(), name='llm_list'),
    path('prompts/', PromptList.as_view(), name='prompt_list'),
    path('prompts/<int:prompt_pk>/responses/', ResponseDetail.as_view(), name='prompt_response_detail'),
]

