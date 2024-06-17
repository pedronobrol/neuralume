from django.apps import AppConfig


class APIConfig(AppConfig):
    name = "api"

    def ready(self):
        import api.signals  # noqa
