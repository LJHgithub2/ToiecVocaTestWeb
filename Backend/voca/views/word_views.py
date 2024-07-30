from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST,require_GET
from django.contrib.contenttypes.models import ContentType
from .user_views import login_required_json
import json
from ..models import (
    Vocabulary,
    Word,
)

@csrf_exempt
@login_required_json
@require_GET
def get_all_word_from_public_vocab(request, vocab_id):
    print("vocab_id",vocab_id)
    try:
        # Vocabulary 인스턴스 가져오기
        vocabulary = Vocabulary.objects.get(id=vocab_id)
    except Vocabulary.DoesNotExist:
        return JsonResponse({'error': 'Vocabulary not found'}, status=404)
    
    # 해당 Vocabulary에 연결된 모든 Word 객체 가져오기
    words = Word.objects.filter(vocabulary=vocabulary)
    
    # 각 Word 객체를 직렬화할 수 있는 형식으로 변환
    words_list = list(words.values('id', 'word', 'mean', 'chapter', 'part_of_speech', 'synonyms', 'antonyms', 'is_favorite', 'correct_count', 'incorrect_count', 'last_attempt_incorrect', 'memo', 'example_sentence', 'added_at'))
    print(words_list)
    return JsonResponse({'words': words_list}, status=200)

@csrf_exempt
@require_POST
@login_required_json
def add_word_to_public_vocab(request, vocab_id):
    try:
        # Vocabulary 인스턴스 가져오기
        vocabulary = Vocabulary.objects.get(id=vocab_id)
    except Vocabulary.DoesNotExist:
        return JsonResponse({'error': 'Vocabulary not found'}, status=404)
    
    # Check if the user has admin privileges
    if not request.user.is_staff and not request.user.is_superuser or request.user != vocabulary.owner:
        return JsonResponse({'errors': "접근이 거부되었습니다. 권한을 확인하세요."}, status=403)

    # 요청 본문에서 데이터 추출
    data = json.loads(request.body)
    word_text = data.get("word")
    meaning = data.get("mean")
    chapter = data.get("chapter", 0)  # 기본값 0
    part_of_speech = data.get("part_of_speech", "")
    synonyms = data.get("synonyms", "")
    antonyms = data.get("antonyms", "")
    is_favorite = data.get("is_favorite", False)
    correct_count = data.get("correct_count", 0)
    incorrect_count = data.get("incorrect_count", 0)
    last_attempt_incorrect = data.get("last_attempt_incorrect", 0)
    memo = data.get("memo", "")
    example_sentence = data.get("example_sentence", "")

    # 필수 필드 검증
    if not word_text or not meaning:
        return JsonResponse({'error': 'Both word and mean are required'}, status=400)
    

    # 클라이언트 측 중복 검증
    if Word.objects.filter(vocabulary=vocabulary, word=word_text).exists():
        return JsonResponse({'error': 'Word already exists in this vocabulary'}, status=409)

    # 새로운 Word 객체 생성 및 저장
    word = Word.objects.create(
        vocabulary=vocabulary,
        word=word_text,
        mean=meaning,
        chapter=chapter,
        part_of_speech=part_of_speech,
        synonyms=synonyms,
        antonyms=antonyms,
        is_favorite=is_favorite,
        correct_count=correct_count,
        incorrect_count=incorrect_count,
        last_attempt_incorrect=last_attempt_incorrect,
        memo=memo,
        example_sentence=example_sentence
    )

    return JsonResponse({'message': 'Word added successfully', 'word': {'id': word.id}}, status=201)
    


