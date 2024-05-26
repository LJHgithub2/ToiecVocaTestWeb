from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.username

class Word(models.Model):
    word = models.CharField(max_length=100, unique=True)
    meaning = models.TextField()
    part_of_speech = models.CharField(max_length=50)
    example_sentence = models.TextField()

    def __str__(self):
        return self.word

class WordBook(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    words = models.ManyToManyField(Word, through='WordBookMembership', related_name='word_books')

    def __str__(self):
        return self.name

class WordBookMembership(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    word_book = models.ForeignKey(WordBook, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('word', 'word_book')

class UserWord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    word_book = models.ForeignKey(WordBook, on_delete=models.CASCADE, default=-1)
    is_favorite = models.BooleanField(default=False)
    correct_count = models.PositiveIntegerField(default=0)
    incorrect_count = models.PositiveIntegerField(default=0)
    last_incorrect = models.BooleanField(default=False)
    memo = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'word', 'word_book')

    def __str__(self):
        return f"{self.user.username} - {self.word_book.name} - {self.word.word}"

class UserWordBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word_book = models.ForeignKey(WordBook, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'word_book')

    def __str__(self):
        return f"{self.user.username} - {self.word_book.name}"
