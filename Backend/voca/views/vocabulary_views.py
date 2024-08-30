from django.views import View
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .user_views import login_required_json
import json
from ..models import (
    Vocabulary,
    User,
)

# dispatch는 모든 http 메소드를 지칭(ex) get,post,put...)
@method_decorator(login_required_json, name='dispatch')
@method_decorator(csrf_exempt, name='dispatch')
class PublicVocabularyView(View):
    def get(self, request, vocab_id=None):
        if vocab_id:
            # 특정 vocab_id에 대한 GET 처리
            return JsonResponse({'message': f'Vocabulary detail for id {vocab_id}'})
        else:
            # 전체 목록에 대한 GET 처리
            return get_public_vocabularys(request)

    def post(self, request):
        # POST 처리
        return add_public_vocabulary(request)

    def delete(self, request, vocab_id):
        # 특정 vocab_id에 대한 DELETE 처리
        return delete_public_vocabulary(request,vocab_id)
    
    def put(self, request, vocab_id):
        # 특정 vocab_id에 대한 update 처리
        return update_public_vocabulary(request,vocab_id)
 
 
def update_public_vocabulary(request, vocabulary_id):
    try:
        vocab = Vocabulary.objects.get(type=0, id=vocabulary_id)

        if request.user != vocab.owner:
            return JsonResponse({'errors': "접근이 거부되었습니다. 권한이 필요합니다."}, status=403)
        
        # Parse the incoming JSON data
        data = json.loads(request.body)
        print(data)
        
        # Update fields if they are present in the request
        if 'name' in data:
            vocab.name = data['name']
        if 'description' in data:
            vocab.description = data['description']
        if 'chapter_count' in data:
            vocab.chapter_count = data['chapter_count']
        if 'is_favorite' in data:
            vocab.is_favorite = data['is_favorite']
        if 'rank' in data:
            vocab.rank = data['rank']

        # Save the updated vocabulary
        vocab.save()

        # Prepare the response data
        updated_vocab_data = {
            'id': vocab.id,
            'name': vocab.name,
            'description': vocab.description,
            'chapter_count': vocab.chapter_count,
            'word_count': vocab.word_count,
            'is_favorite': vocab.is_favorite,
            'owner': vocab.owner.username,
            'rank': vocab.rank,
            'type': vocab.type,
            'vocabulary_images': vocab.vocabulary_images.url if vocab.vocabulary_images else None,
        }

        return JsonResponse({'vocab': updated_vocab_data}, status=200)
    
    except Vocabulary.DoesNotExist:
        return JsonResponse({'errors': "해당 단어장을 찾을 수 없습니다."}, status=404)
    except Exception as e:
        return JsonResponse({'errors': str(e)}, status=400)
    
def delete_public_vocabulary(request,vocabulary_id):
    try:
        vocabularies = Vocabulary.objects.get(type=0, id=vocabulary_id)

        print(vocabulary_id)
        if request.user != vocabularies.owner:
            return JsonResponse({'errors': "접근이 거부되었습니다. 권한이 필요합니다."}, status=403)
        
        vocabularies.delete()
        
        # Fetch all vocabulary entries
        return JsonResponse({'deleted_id':vocabulary_id}, status=200)
    
    except Exception as e:
        print(e)
        return JsonResponse({'errors': e}, status=400)


def get_public_vocabularys(request):
    # Fetch all vocabulary entries
    vocabularies = Vocabulary.objects.filter(type=0).all()
    vocab_list = []

    for vocab in vocabularies:
        vocab_data = {
            'id': vocab.id,
            'name': vocab.name,
            'description': vocab.description,
            'chapter_count': vocab.chapter_count,
            'word_count': vocab.word_count,
            'is_favorite': vocab.is_favorite,
            'owner': vocab.owner.username,
            'rank': vocab.rank,
            'type' : vocab.type,
            'vocabulary_images': vocab.vocabulary_images.url if vocab.vocabulary_images else None,
        }
        vocab_list.append(vocab_data)

    # Wrap the list in a dictionary
    vocab_data = {'vocabularies': vocab_list}
    print(vocab_data)

    # Return as JSON
    return JsonResponse(vocab_data, status=200)


def add_public_vocabulary(request):
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
            chapter_count=request.POST.get('chapter_count',0),
            type = 0,
            owner = request.user
        )
        public_vocabulary.save()
        # public_vocabulary_data = model_to_dict(public_vocabulary, exclude=[''])
        public_vocabulary_data = model_to_dict(public_vocabulary)
        
        public_vocabulary_data['vocabulary_images'] = public_vocabulary.vocabulary_images.url if public_vocabulary.vocabulary_images else None,
        public_vocabulary_data['owner'] = request.user.username
        public_vocabulary_data['rank'] = int(public_vocabulary_data['rank'])

        return JsonResponse({'vocab':public_vocabulary_data}, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({'errors': str(e)}, status=500)