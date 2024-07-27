from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class User(AbstractUser):
    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField(blank=True, null=True) # 자기소개
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    job = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)

    def update_profile(self, bio=None, job=None, profile_image=None, location=None):
        if bio is not None:
            self.bio = bio
        if profile_image is not None:
            self.profile_image = profile_image
        if job is not None:
            self.job = job
        if location is not None:
            self.location = location
        self.save()

    def get_age(self):
        if self.date_of_birth:
            today = timezone.now().date()
            return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
        return None

    def get_profile_summary(self):
        return f"{self.user.username} - {self.bio[:30]}..." if self.bio else f"{self.user.username}"

    def __str__(self):
        return self.user.username

class Vocabulary(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chapter_count = models.IntegerField(default=0)
    vocabulary_images = models.ImageField(upload_to='vocabulary_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    def get_vocabulary_info(self):
        return f"{self.name}: {self.description}"
    

    class Meta:
        abstract = True  # 추상 모델로 설정

class Word(models.Model):
    # 추상클래스의 상속객체중 하나를 참조
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    wordbook = GenericForeignKey('content_type', 'object_id')

    word = models.CharField(max_length=100, unique=True)
    mean = models.TextField()
    chapter=models.IntegerField(default=0)
    part_of_speech = models.CharField(max_length=50)  # 품사
    synonyms = models.TextField(blank=True)
    antonyms = models.TextField(blank=True)
    is_favorite= models.BooleanField(default=False)
    correct_count=models.IntegerField(default=0)
    incorrect_count=models.IntegerField(default=0)
    last_attempt_incorrect=models.IntegerField(default=0)
    memo= models.TextField(blank=True)
    example_sentence = models.TextField(blank=True)
    related_words = models.ManyToManyField('self', related_name='related_to',blank=True, symmetrical=False)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word

    def get_word_info(self):
        return f"{self.word} ({self.part_of_speech}): {self.mean}"

    def update_mean(self, mean):
        self.mean = mean
        self.save()

    def add_synonym(self, synonym):
        if self.synonyms:
            self.synonyms += f", {synonym}"
        else:
            self.synonyms = synonym
        self.save()

    def remove_synonym(self, synonym):
        synonyms_list = self.synonyms.split(", ")
        if synonym in synonyms_list:
            synonyms_list.remove(synonym)
            self.synonyms = ", ".join(synonyms_list)
            self.save()

    def add_antonym(self, antonym):
        if self.antonyms:
            self.antonyms += f", {antonym}"
        else:
            self.antonyms = antonym
        self.save()

    def remove_antonym(self, antonym):
        antonyms_list = self.antonyms.split(", ")
        if antonym in antonyms_list:
            antonyms_list.remove(antonym)
            self.antonyms = ", ".join(antonyms_list)
            self.save()

    def add_example_sentence(self, example_sentence):
        if self.example_sentence:
            self.example_sentence += f"\n{example_sentence}"
        else:
            self.example_sentence = example_sentence
        self.save()

    def find_related_words(self, word):
        return self.related_words.filter(word=word)

class PublicVocabulary(Vocabulary):
    RANK_CHOICES = [
        (1, "비법 단어장"),
        (2, "인증 단어장"),
        (3, "일반 단어장"),
        (4, "인증되지 않은 단어장")
    ]
    rank = models.IntegerField(choices=RANK_CHOICES)

    def get_public_vocabulary_info(self):
        return f"{self.name}: {self.description} (Rank: {self.rank})"

    def update_rank(self, rank):
        self.rank = rank
        self.save()


class PersonalVocabulary(Vocabulary):
    owner = models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)
    is_favorite= models.BooleanField(default=False)

    def get_personal_vocabulary_info(self):
        return f"{self.owner.username}: {self.description}"
