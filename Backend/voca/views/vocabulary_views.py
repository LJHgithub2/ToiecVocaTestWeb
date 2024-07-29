
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from .user_views import login_required_json
from ..models import (
    Vocabulary,
    User,
)

@csrf_exempt
@login_required_json
@require_GET
def get_public_vocabularys(request):
    # Fetch all vocabulary entries
    vocabularies = Vocabulary.objects.filter(type=0).all()
    vocab_list = []

    for vocab in vocabularies:
        vocab_data = {
            'id': vocab.id,
            'name': vocab.name,
            'description': vocab.description,
            'owner': vocab.owner.username,
            'rank': vocab.rank,
            'vocabulary_images': vocab.vocabulary_images.url if vocab.vocabulary_images else None,
        }
        vocab_list.append(vocab_data)

    # Wrap the list in a dictionary
    vocab_data = {'vocabularies': vocab_list}
    print(vocab_data)

    # Return as JSON
    return JsonResponse(vocab_data, status=200)

@csrf_exempt
@require_POST
@login_required_json
def add_public_vocabularys(request):
    print(request.POST)
    # Check if the user has admin privileges
    if not request.user.is_staff and not request.user.is_superuser:
        return JsonResponse({'errors': "접근이 거부되었습니다. 관리자 권한이 필요합니다."}, status=403)

    # Get file data from the request
    vocab_image = request.FILES.get('vocab_image')
    if not vocab_image:
        return JsonResponse({'errors': "파일이 제공되지 않았습니다."}, status=400)

    # Validate the file type (e.g., check if it's an image)
    if not vocab_image.content_type.startswith('image/'):
        return JsonResponse({'errors': "유효한 이미지 파일이 아닙니다."}, status=400)
    
    # Update and save the profile image
    try:
        # Create a new PublicVocabulary model instance
        public_vocabulary = Vocabulary(
            vocabulary_images=vocab_image,
            name=request.POST.get('name'),
            description=request.POST.get('description'),
            rank=request.POST.get('rank'),
            chapter_count=request.POST.get('chapter_count'),
            type = 0,
            owner = request.user
        )
        public_vocabulary.save()

        return JsonResponse({'vocab_image': public_vocabulary.vocabulary_images.url}, status=200)
    except Exception as e:
        return JsonResponse({'errors': str(e)}, status=500)