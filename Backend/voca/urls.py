from django.urls import path

from . import views

# 이름 공간 추가
app_name="voca"
urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
]