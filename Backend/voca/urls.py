from django.urls import path
from .views import login, register, logout, auth_status

from . import views

# 이름 공간 추가
app_name="voca"
urlpatterns = [
    # test endpoint
    path('putapi/', views.putTestAPI), # 추가

    # user endpoints
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),  # name 수정
    path("register/", register, name="register"),
    path("auth-status/", auth_status, name="auth_status"),

    # Profile endpoints
    path('api/profile/<str:username>/', views.ProfileView.as_view(), name='profile_view'),
    path('api/profile/<str:username>/image/', views.ProfileImageView.as_view(), name='profile_image'),


    # Vocabulary endpoints
    path('api/vocabularies/public/', views.PublicVocabularyView.as_view(), name='VocabularyListCreateView'),
    path('api/vocabularies/public/<int:vocab_id>/', views.PublicVocabularyView.as_view(), name='PublicVocabularyDetailView'),
    path('api/vocabularies/public/<int:vocab_id>/words/', views.VocabularyWordView.as_view(), name='VocabularyWordView'),
    # path('api/add_wordbook/', views.add_wordbook, name='add_wordbook'),
    # path('api/add_user_word/', views.add_user_word, name='add_user_word'),
    # path('api/add_wordbooks_with_words/', views.add_wordbooks_with_words, name='add_wordbooks_with_words'),

    # Google TTS endpoint
    path('api/openai-tts/', views.tts, name='openai_tts'),  # 추가
]