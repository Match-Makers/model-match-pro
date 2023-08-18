from django.db import models
from django.contrib.auth import get_user_model


class LLM(models.Model):
    name = models.CharField(max_length=64)
    api_code = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Prompt(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    input_str = models.TextField()
    request_time = models.DateTimeField(auto_now=True)
    lang_models = models.JSONField(default=list, null=True)

    def __str__(self):
        return self.input_str


class Responses(models.Model):
    prompt_id = models.ForeignKey(Prompt, on_delete=models.CASCADE)
    lang_model_id = models.ForeignKey(LLM, on_delete=models.CASCADE)
    response = models.TextField()

    def __str__(self):
        return self.response
