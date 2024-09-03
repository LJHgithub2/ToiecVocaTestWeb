from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.views import View
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST,require_GET
from django.utils.decorators import method_decorator
from .user_views import login_required_json
from django.forms.models import model_to_dict
import json
from ..models import (
    Vocabulary,
    Word,
)

# dispatch는 모든 http 메소드를 지칭(ex) get,post,put...)
@method_decorator(login_required_json, name='dispatch')
@method_decorator(csrf_exempt, name='dispatch')
class VocabularyWordView(View):
    def get(self, request, vocab_id):
        # 프로필 이미지 업로드 로직
        return get_all_word_from_public_vocab(request,vocab_id)

    def post(self, request, vocab_id):
        # 프로필 이미지 삭제 로직
        return add_word_to_public_vocab(request,vocab_id)
    
# 모든단어 가져오기
def get_all_word_from_public_vocab(request, vocab_id):
    try:
        # Vocabulary 인스턴스 가져오기
        vocabulary = Vocabulary.objects.get(id=vocab_id)
    except Vocabulary.DoesNotExist:
        return JsonResponse({'error': 'Vocabulary not found'}, status=404)
    
    # 해당 Vocabulary에 연결된 모든 Word 객체 가져오기
    words = Word.objects.filter(vocabulary=vocabulary)
    
    # 각 Word 객체를 직렬화할 수 있는 형식으로 변환
    words_list = list(words.values('id', 'word', 'mean', 'chapter', 'part_of_speech', 'synonyms', 'antonyms', 'is_favorite', 'correct_count', 'incorrect_count', 'last_attempt_incorrect', 'memo', 'example_sentence', 'added_at'))
    return JsonResponse({'words': words_list}, status=200)

@csrf_exempt
@login_required_json
@require_GET
def get_words_by_range(request, vocab_id):
    # 쿼리 파라미터에서 startIndex와 endIndex 값을 가져옴
    start_index = (int(request.GET.get('page', 1))-1)*20

    # vocabulary_id에 해당하는 Vocabulary 객체를 가져옴
    vocabulary = get_object_or_404(Vocabulary, id=vocab_id)
    print(start_index,start_index+20)

    # Word 객체를 startIndex와 endIndex 범위로 필터링
    words = Word.objects.filter(vocabulary=vocabulary).order_by('id')[start_index:start_index+20]

    # JSON 응답으로 반환할 데이터 형식 지정
    words_list = list(words.values('id', 'word', 'mean', 'chapter', 'part_of_speech', 'synonyms', 'antonyms', 'is_favorite', 'correct_count', 'incorrect_count', 'last_attempt_incorrect', 'memo', 'example_sentence', 'added_at'))
    
    return JsonResponse({'words': words_list}, status=200)

def add_word_to_public_vocab(request, vocab_id):
    # Vocabulary 인스턴스 가져오기
    try:
        vocabulary = Vocabulary.objects.get(id=vocab_id)
    except Vocabulary.DoesNotExist:
        return JsonResponse({'error': 'Vocabulary not found'}, status=404)

    # 사용자 권한 확인
    if request.user != vocabulary.owner and not (request.user.is_staff or request.user.is_superuser):
        return JsonResponse({'error': "접근이 거부되었습니다. 권한을 확인하세요."}, status=403)

    # 요청 본문에서 데이터 추출
    data = json.loads(request.body)
    required_fields = ['word', 'mean']
    if any(field not in data or not data[field] for field in required_fields):
        return JsonResponse({'error': 'Both word and mean are required'}, status=400)

    # 클라이언트 측 중복 검증
    if Word.objects.filter(vocabulary=vocabulary, word=data['word']).exists():
        return JsonResponse({'error': 'Word already exists in this vocabulary'}, status=409)

    # 새로운 Word 객체 생성 및 저장
    word = Word.objects.create(
        vocabulary=vocabulary,
        word=data['word'],
        mean=data['mean'],
        chapter=data.get('chapter', 0),
        part_of_speech=data.get('part_of_speech', ''),
        synonyms=data.get('synonyms', ''),
        antonyms=data.get('antonyms', ''),
        is_favorite=data.get('is_favorite', False),
        correct_count=data.get('correct_count', 0),
        incorrect_count=data.get('incorrect_count', 0),
        last_attempt_incorrect=data.get('last_attempt_incorrect', 0),
        memo=data.get('memo', ''),
        example_sentence=data.get('example_sentence', '')
    )
    word_dict = model_to_dict(word, fields=['id', 'word', 'mean', 'chapter', 'part_of_speech', 'synonyms', 'antonyms', 'is_favorite', 'correct_count', 'incorrect_count', 'last_attempt_incorrect', 'memo', 'example_sentence', 'added_at'])


    return JsonResponse({'message': 'Word added successfully', 'word': word_dict}, status=201)