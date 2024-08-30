from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

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

    def __str__(self):
        return self.user.username


class Vocabulary(models.Model):
    TYPE_CHOICES = [
        (0, 'Public Vocabulary'),
        (1, 'Personal Vocabulary'),
    ]
    RANK_CHOICES = [
        (1, "비법 단어장"),
        (2, "인증 단어장"),
        (3, "일반 단어장"),
        (4, "인증되지 않은 단어장")
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chapter_count = models.IntegerField(default=0)
    word_count = models.IntegerField(default=0)  # 카운터 필드 추가
    vocabulary_images = models.ImageField(upload_to='vocabulary_images/', blank=True, null=True)
    type = models.IntegerField(choices=TYPE_CHOICES)
    rank = models.IntegerField(null=True, blank=True, choices=RANK_CHOICES)  # For PublicVocabulary only
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)

    class Meta:
        # 낮은 버전용
        # unique_together = ('name', 'type')

        # Alternatively, for Django 2.2+ you can use UniqueConstraint

        # 최신버전 문법
        constraints = [
            models.UniqueConstraint(fields=['name', 'type'], name='unique_name_type')
        ]

    def __str__(self):
        return self.name
    

class Word(models.Model):
    vocabulary = models.ForeignKey(Vocabulary, on_delete=models.CASCADE)
    
    word = models.CharField(max_length=100)
    mean = models.TextField()
    chapter = models.IntegerField(default=0)
    part_of_speech = models.CharField(max_length=50)  # 품사
    synonyms = models.TextField(blank=True)
    antonyms = models.TextField(blank=True)
    is_favorite = models.BooleanField(default=False)
    correct_count = models.IntegerField(default=0)
    incorrect_count = models.IntegerField(default=0)
    last_attempt_incorrect = models.IntegerField(default=0)
    memo = models.TextField(blank=True)
    example_sentence = models.TextField(blank=True)
    related_words = models.ManyToManyField('self', related_name='related_to', blank=True, symmetrical=False)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['vocabulary', 'word'], name='unique_word_in_vocabulary')
        ]

    def __str__(self):
        return self.word
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # 부모 클래스의 save 호출
        # 추가 로직이 필요한 경우 여기에 추가

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)  # 부모 클래스의 delete 호출

