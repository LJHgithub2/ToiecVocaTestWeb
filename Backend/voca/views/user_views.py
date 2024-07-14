import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
# django를 api서버로 사용하기에 커스텀 login_required를 만들어 사용
# from django.contrib.auth.decorators import login_required
from django.http import JsonResponse,HttpResponse, HttpResponseForbidden, HttpResponseBadRequest
from functools import wraps
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST,require_GET
from ..models import (
    Profile,
    User,
)

def user_list(request):
    # 사용자 리스트를 반환하는 뷰 로직
    return HttpResponse("User List")

def user_detail(request, user_id):
    # 사용자 상세 정보를 반환하는 뷰 로직
    return HttpResponse(f"User Detail for {user_id}")

# 커스텀 로그인 확인함수(로그인이 아닐경우 json으로 실패 반환)
def login_required_json(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"detail": "plz login"}, status=401)
        return view_func(request, *args, **kwargs)
    return _wrapped_view

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

    # 사용자가 생성될때 profile도 자동으로 등록
    Profile.objects.create(user=user)

    # 응답으로 사용자 정보 전달
    return JsonResponse({"id": user.id, "username": user.username}, status=201)


@csrf_exempt #crsf를 사용하지 않겠다.
@require_POST
def login(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # 아래 코드 실행시 sessionid, csrftoken이 생성
        # sessionid는 사용자 세션과 관련된 상태 정보를 식별하기 위한 고유한 식별자입니다.
        # 이를 클라이언트(웹 브라우저)에 쿠키로 저장
        auth_login(request, user) 
        return JsonResponse({"userId": user.id}, status=200)
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=400)

@csrf_exempt
@login_required_json # 로그인 상태아니면 실패 json 반환
@require_POST
def logout(request):
    try:
        auth_logout(request)
        return JsonResponse({"result": "Logout success"}, status=200)
    except Exception as e:
        return JsonResponse({"result": "Logout failed", "error": str(e)}, status=500)
    
@login_required_json
@require_GET
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
