import json
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
# django를 api서버로 사용하기에 커스텀 login_required를 만들어 사용
# from django.contrib.auth.decorators import login_required
from django.http import JsonResponse,HttpResponse, HttpResponseForbidden, HttpResponseBadRequest
from functools import wraps
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.db import DatabaseError
from django.views.decorators.http import require_POST,require_GET
from django.shortcuts import render
from ..models import (
    Profile,
    User,
)

def get_user_basic_info(curr_user, username):
    user = get_object_or_404(User, username=username)
    
    if curr_user != user:
        return None

    profile = get_object_or_404(Profile, user=user)
    
    profile_data  = {
        "username": profile.user.username,
        "firstname": profile.user.first_name,
        "lastname": profile.user.last_name,
        "profile_image": profile.profile_image.url if profile.profile_image else None,
    }
    return profile_data



# 커스텀 로그인 확인함수(로그인이 아닐경우 json으로 실패 반환)
def login_required_json(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # 전송된 쿠키 출력 (디버깅 용도)
        print("Received cookies:", request.COOKIES)

        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False}, status=401)  # 인증 실패 시 401 상태 코드
        response = view_func(request, *args, **kwargs)
        
        # JSON 응답을 포함한 응답 처리
        if isinstance(response, JsonResponse):
            response_data = json.loads(response.content.decode('utf-8'))
        else:
            response_data = response
            
        response_data['isAuthenticated'] = True
        
        return JsonResponse(response_data, safe=False)
    return _wrapped_view

@require_GET
@login_required_json
def auth_status(request):
    print(request.user)
    user_info = get_user_basic_info(request.user, request.user.username)# json 반환
    return JsonResponse({'isAuthenticated': True, 'user' : user_info}, status=201)

@csrf_exempt
@require_POST
def register(request):
    data = json.loads(request.body)
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    username = data.get("ID")  # username is taken from ID field
    password = data.get("password")
    bio = data.get("message")

    if not first_name or not last_name or not username or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    # 사용자 생성
    user = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name)

    # 프로필 생성 및 연결
    Profile.objects.create(user=user, bio=bio, profile_image=None)

    # 응답으로 사용자 정보 전달
    return JsonResponse({'username':user.username},status=201)

@csrf_exempt #crsf를 사용하지 않겠다.
@require_POST
def login(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")
    print(username,password)

    if not username or not password:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        # 아래 코드 실행시 sessionid, csrftoken이 생성
        # sessionid는 사용자 세션과 관련된 상태 정보를 식별하기 위한 고유한 식별자입니다.
        # 이를 클라이언트(웹 브라우저)에 쿠키로 저장
        auth_login(request, user) 
        user_info = get_user_basic_info(user, user.username)# json 반환
        return JsonResponse({'isAuthenticated': True, 'user' : user_info}, status=200)
    else:
        return JsonResponse({"error": "회원이 아닙니다."}, status=400)

@csrf_exempt
@login_required_json
@require_POST
def logout(request):
    try:
        # 사용자 로그아웃
        auth_logout(request)

        # 응답 생성 및 세션 쿠키 삭제
        response = JsonResponse({"result": "Logout success"}, status=200)
        
        response.delete_cookie('sessionid')

        # 세션 데이터 삭제
        request.session.flush()

        print("로그아웃 성공")
        return response

    except DatabaseError:
        # 세션 저장 시 발생하는 DatabaseError 처리
        print("세션 저장 중 오류 발생")
        return JsonResponse({"result": "Logout failed", "error": "Session save error"}, status=500)

    except Exception as e:
        # 기타 예외 처리
        return JsonResponse({"result": "Logout failed", "error": str(e)}, status=500)


def get_user_personal_vocabularies(user_id):
    # 주어진 user_id에 해당하는 User 객체를 가져옵니다.
    user = get_object_or_404(User, id=user_id)
    
    # 해당 User 객체가 가진 모든 PersonalVocabulary 객체를 가져옵니다.
    personal_vocabularies = PersonalVocabulary.objects.filter(owner=user)
    
    return personal_vocabularies
    

def index(request):
    return render(request, "voca/index.html")