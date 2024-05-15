from django.urls import path

from . import views

# 이름 공간 추가
app_name="voca"
urlpatterns = [
    path("", views.index, name="index"),
]