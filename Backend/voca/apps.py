from django.apps import AppConfig


class VocaConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "voca"


    def ready(self):
        # 시그널 핸들러를 등록합니다.
        import voca.signals
