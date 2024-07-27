

from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.contenttypes.models import ContentType
from .user_views import login_required_json
from ..models import (
    Profile,
    User,
)


# Word 인스턴스 생성
# content_type = ContentType.objects.get_for_model(SpecificVocabulary1)
# word = Word.objects.create(content_type=content_type, object_id=vocab1.id, word="example", mean="example meaning")


