from django.apps import AppConfig


class TemplateConfig(AppConfig): # keep name same
    default_auto_field = "django.db.models.BigAutoField"
    name = "frontend"
