from django.views import View
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET, require_http_methods
from .user_views import login_required_json
from django.utils.decorators import method_decorator
from ..models import (
    Profile,
    User,
    Vocabulary
)

def get_profile_model(cur_user,username):
    
    user = get_object_or_404(User, username=username)
    
    if cur_user != user:
        return (None,None)

    profile = get_object_or_404(Profile, user=user)
    return (user,profile) if profile and user else (None,None)


@login_required_json
@require_GET
def profile_view(request, username):
    (user,profile) = get_profile_model(request.user, username)
    if not profile :
       return JsonResponse({'errors': "프로필 권한이 없습니다."}, status=400)

    personal_vocabularies = Vocabulary.objects.filter(owner=user).values('id', 'name', 'description', 'created_at', 'chapter_count')  # 필드 지정

    profile_data  = {
        "profile_image": profile.profile_image.url if profile.profile_image else None,
        "username": profile.user.username,
        "firstname": profile.user.first_name,
        "lastname": profile.user.last_name,
        "job" : profile.job,
        "gender" : profile.gender,
        "bio" : profile.bio,
        "myVocabulary" : list(personal_vocabularies),
    }
    # print(profile_data)
    return JsonResponse({'profile':profile_data}, status=200)

# dispatch는 모든 http 메소드를 지칭(ex) get,post,put...)
@method_decorator(login_required_json, name='dispatch')
@method_decorator(csrf_exempt, name='dispatch')
class ProfileImageView(View):
    def put(self, request, username):
        # 프로필 이미지 업로드 로직
        return upload_profile_image(request,username)

    def delete(self, request, username):
        # 프로필 이미지 삭제 로직
        return delete_profile_image(request,username)

def upload_profile_image(request, username):
    # 사용자 프로필 가져오기
    (_, profile) = get_profile_model(request.user, username)
    if not profile:
        return JsonResponse({'errors': "프로필 권한이 없습니다."}, status=400)
    
    # 요청에서 파일 데이터 가져오기
    profile_image = request.FILES.get('profile_image')
    if not profile_image:
        return JsonResponse({'errors': "파일이 제공되지 않았습니다."}, status=400)

    # 파일 유효성 검사 (예: 이미지 파일 형식 확인)
    if not profile_image.content_type.startswith('image/'):
        return JsonResponse({'errors': "유효한 이미지 파일이 아닙니다."}, status=400)
    
    # 프로필 이미지 업데이트 및 저장
    try:
        profile.profile_image = profile_image
        profile.save()
        return JsonResponse({'profile_image': profile.profile_image.url}, status=200)
    except Exception as e:
        return JsonResponse({'errors': str(e)}, status=500)
    
    
def delete_profile_image(request, username):
    # 사용자 프로필 가져오기
    (_, profile) = get_profile_model(request.user, username)
    if not profile:
        return JsonResponse({'errors': "프로필을 찾을 수 없습니다."}, status=400)
    
    # 이미지 파일 삭제하기
    if profile.profile_image and profile.profile_image.name:
        profile.profile_image.delete(save=False)

    # 모델 필드를 null로 설정
    profile.profile_image = None

    print(profile.profile_image)
    # 모델 인스턴스 저장하기
    profile.save()

    return JsonResponse({'message': 'Image deleted successfully'}, status=200)