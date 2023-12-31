# Generated by Django 4.2.4 on 2023-08-18 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LLM',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('api_code', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Prompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input_str', models.TextField()),
                ('request_time', models.DateTimeField(auto_now=True)),
                ('lang_models', models.JSONField(default=list, null=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Responses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.TextField()),
                ('lang_model_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='model_match_app.llm')),
                ('prompt_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='model_match_app.prompt')),
            ],
        ),
    ]
