
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.contrib.contenttypes.models import ContentType
from .user_views import login_required_json
from ..models import (
    PublicVocabulary,
    User,
)


@login_required_json
@require_GET
def get_vocabularys(request):

    # Fetch all vocabulary entries
    vocabularies = PublicVocabulary.objects.all()

    vocab_list = list(vocabularies.values('name', 'description', 'vocabulary_images', 'rank'))  # Adjust fields as needed

    # 리스트를 딕셔너리로 감싸기
    vocab_data = {'vocabularies': vocab_list}
    print(vocab_list[0]['vocabulary_images'])

    # safe =False  ->  딕셔너리 타입이 아닌 데이터도 반환할 수 있다.
    return JsonResponse(vocab_data, status=200)

