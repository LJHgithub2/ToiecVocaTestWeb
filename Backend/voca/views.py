import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login, logout
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import (
    Profile,
    User,
)


@csrf_exempt
@require_POST
def register(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    # 사용자 생성 및 프로필 연결
    user = User.objects.create_user(username=username, password=password)
    Profile.objects.create(user=user)

    # 응답으로 사용자 정보 전달
    return JsonResponse({"id": user.id, "username": user.username}, status=201)


def index(request):
    return render(request, "voca/index.html")


@csrf_exempt
@require_POST
def login(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        auth_login(request, user)  # Django의 내장 login 함수를 호출할 때는 auth_login으로 변경합니다.
        return JsonResponse({"userId": user.id}, status=200)
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    
@login_required
def profile_view(request, username):
    user = get_object_or_404(User, username=username)
    
    if request.user != user:
        return HttpResponseForbidden("You are not allowed to view this profile.")

    profile = get_object_or_404(Profile, user=user)
    
    profile_data  = {
        "username": profile.user.username,
        "bio": profile.bio,
        "date_of_birth": profile.date_of_birth,
        "gender": profile.gender,
        "location": profile.location,
        "profile_image": profile.profile_image.url if profile.profile_image else None,
    }
    return JsonResponse(profile_data, status=200)
