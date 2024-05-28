import json
from django.contrib.auth import authenticate, login as auth_login, logout
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import (
    Profile,
    User,
    Word,
    WordBook,
    UserWord,
    UserWordBook,
    WordBookMembership,
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


@login_required
def wordbook_list_view(request):
    wordbooks = WordBook.objects.all()
    data = [
        {"id": wb.id, "name": wb.name, "description": wb.description}
        for wb in wordbooks
    ]
    return JsonResponse(data, safe=False)


@login_required
def wordbook_detail_view(request, wordbook_id):
    wordbook = get_object_or_404(WordBook, id=wordbook_id)
    words = wordbook.words.all()
    words_data = [
        {
            "id": word.id,
            "word": word.word,
            "meaning": word.meaning,
            "part_of_speech": word.part_of_speech,
            "example_sentence": word.example_sentence,
        }
        for word in words
    ]
    data = {
        "id": wordbook.id,
        "name": wordbook.name,
        "description": wordbook.description,
        "words": words_data,
    }
    return JsonResponse(data)


@require_POST
@login_required
def add_word_to_wordbook(request, wordbook_id):
    wordbook = get_object_or_404(WordBook, id=wordbook_id)
    word_data = json.loads(request.body)
    word = Word.objects.create(**word_data)
    WordBookMembership.objects.create(word=word, word_book=wordbook)
    return JsonResponse({"message": "Word added successfully!"})


@require_POST
@login_required
def add_wordbook(request):
    wordbook_data = json.loads(request.body)
    wordbook = WordBook.objects.create(**wordbook_data)
    UserWordBook.objects.create(user=request.user, word_book=wordbook)
    return JsonResponse({"message": "WordBook added successfully!"})


@require_POST
@login_required
def add_user_word(request):
    data = json.loads(request.body)
    user = request.user
    word_id = data.get("word_id")
    wordbook_id = data.get("wordbook_id")

    if not word_id or not wordbook_id:
        return HttpResponseBadRequest("Word ID and WordBook ID are required.")

    word = get_object_or_404(Word, id=word_id)
    wordbook = get_object_or_404(WordBook, id=wordbook_id)

    # Check if the word is in at least one WordBook
    if not WordBookMembership.objects.filter(word=word).exists():
        return HttpResponseBadRequest("The word must belong to at least one wordbook.")

    user_word, created = UserWord.objects.get_or_create(
        user=user,
        word=word,
        word_book=wordbook,
        defaults={
            "is_favorite": False,
            "correct_count": 0,
            "incorrect_count": 0,
            "last_incorrect": False,
            "memo": "",
        },
    )

    if not created:
        return JsonResponse({"message": "UserWord already exists."})

    return JsonResponse({"message": "UserWord added successfully!"})

# 단어장 일괄 입력
@csrf_exempt
@require_POST
@login_required
def add_wordbooks_with_words(request):
    data = json.loads(request.body)
    wordbooks_data = data.get("wordbooks")

    if not wordbooks_data:
        return HttpResponseBadRequest("No wordbook data provided.")

    for wordbook_data in wordbooks_data:
        print(wordbook_data)
        name = wordbook_data.get("name")
        description = wordbook_data.get("description")
        words_data = wordbook_data.get("words")

        if not name or not words_data:
            return HttpResponseBadRequest("Wordbook name and words are required.")

        wordbook = WordBook.objects.create(name=name, description=description)
        
        for word_data in words_data:
            word = word_data.get("word")
            meaning = word_data.get("meaning")
            part_of_speech = word_data.get("part_of_speech")
            example_sentence = word_data.get("example_sentence")

            if not word or not meaning:
                continue

            word_obj, created = Word.objects.get_or_create(
                word=word,
                defaults={
                    "meaning": meaning,
                    "part_of_speech": part_of_speech,
                    "example_sentence": example_sentence,
                },
            )
            print(f"{wordbook.name}에 {word_obj.word}를 입력")

            WordBookMembership.objects.create(word=word_obj, word_book=wordbook)


    return JsonResponse({"message": "Wordbooks and words added successfully!"}, status=201)


def acquire_wordbook(user, wordbook):
    # 해당 단어장에 속한 모든 단어를 가져옵니다.
    words_in_wordbook = wordbook.words.all()

    # 각 단어에 대해 사용자의 UserWord를 생성합니다.
    for word in words_in_wordbook:
        # 이미 사용자의 UserWord가 있는지 확인합니다.
        user_word_exists = UserWord.objects.filter(
            user=user, word=word, word_book=wordbook
        ).exists()
        if not user_word_exists:
            # UserWord를 생성합니다.
            UserWord.objects.create(
                user=user,
                word=word,
                word_book=wordbook,
                is_favorite=False,
                correct_count=0,
                incorrect_count=0,
                last_incorrect=False,
                memo=""
            )