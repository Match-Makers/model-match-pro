from django.contrib import admin
from .models import LLM, Prompt, Responses

admin.site.register(LLM)
admin.site.register(Prompt)
admin.site.register(Responses)
