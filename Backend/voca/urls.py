from django.urls import path
from .views import login, register, logout, auth_status

from . import views

# 이름 공간 추가
app_name="voca"
urlpatterns = [
    path("login/", login, name="login"),  # 'views.' prefix 추가
    path("logout/", logout, name="logout"),  # name 수정
    path("register/", register, name="register"),
    path("auth-status/", auth_status, name="auth_status"),

    # Profile endpoints
    path('api/profile/<str:username>/', views.profile_view, name='profile_view'),
    path('api/profile/<str:username>/upload/', views.upload_profile_image, name='profile_image_upload'),
    path('api/profile/<str:username>/upload/', views.upload_profile_image, name='profile_image_upload'),


    # Vocabulary endpoints
    path('api/vocabularies/', views.get_public_vocabularys, name='get_public_vocabularys'),  # 명사형으로 변경
    path('api/vocabularies/', views.add_public_vocabulary, name='add_public_vocabulary'),  # 동일한 엔드포인트를 사용하지만, 메서드로 구분
    path('api/vocabularies/<int:vocab_id>/', views.get_all_word_from_public_vocab, name='get_all_word_from_public_vocab'),  # 명사형으로 변경
    path('api/vocabularies/<int:vocab_id>/words/', views.add_word_to_public_vocab, name='add_word_to_public_vocab'),
    # path('api/add_wordbook/', views.add_wordbook, name='add_wordbook'),
    # path('api/add_user_word/', views.add_user_word, name='add_user_word'),
    # path('api/add_wordbooks_with_words/', views.add_wordbooks_with_words, name='add_wordbooks_with_words'),
]