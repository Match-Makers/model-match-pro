from django.urls import path
from .views import PromptList, PromptDetail, ResponseList, HistoryList, LLMList

urlpatterns = [
    path("", LLMList.as_view(), name='llm_list'),
    path('prompts/', PromptList.as_view(), name='prompt_list'),
    path('prompts/<int:pk>', PromptDetail.as_view(), name='prompt_detail'),
    path('prompts/<int:pk>/responses/',
         ResponseList.as_view(), name='response_list'),
    path('responses/', HistoryList.as_view(), name='history_list'),
]
