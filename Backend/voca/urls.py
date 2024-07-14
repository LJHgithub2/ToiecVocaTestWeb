from django.urls import path
from .views import login, register, logout

from . import views

# 이름 공간 추가
app_name="voca"
urlpatterns = [
    path("", views.index, name="index"),
    path("login/", login, name="login"),
    path("logout/", logout, name="login"),
    path("register/", register, name="register"),
    path('api/profile/<str:username>/', views.profile_view, name='profile_view'),
    # path('api/wordbooks/', views.wordbook_list_view, name='wordbook_list'),
    # path('api/wordbook/<int:wordbook_id>/', views.wordbook_detail_view, name='wordbook_detail'),
    # path('api/wordbook/<int:wordbook_id>/add_word/', views.add_word_to_wordbook, name='add_word_to_wordbook'),
    # path('api/add_wordbook/', views.add_wordbook, name='add_wordbook'),
    # path('api/add_user_word/', views.add_user_word, name='add_user_word'),
    # path('api/add_wordbooks_with_words/', views.add_wordbooks_with_words, name='add_wordbooks_with_words'),
]