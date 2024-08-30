# myapp/signals.py

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Word, Vocabulary

@receiver(post_save, sender=Word)
def update_word_count_on_create(sender, instance, **kwargs):
    # Word가 생성될 때마다 Vocabulary의 word_count를 증가시킵니다.
    vocabulary = instance.Vocabulary
    vocabulary.word_count = vocabulary.word_set.count()  # 카운터를 갱신합니다.
    vocabulary.save()

@receiver(post_delete, sender=Word)
def update_word_count_on_delete(sender, instance, **kwargs):
    # Word가 삭제될 때마다 Vocabulary의 word_count를 감소시킵니다.
    vocabulary = instance.vocabulary
    vocabulary.word_count = vocabulary.word_set.count()  # 카운터를 갱신합니다.
    vocabulary.save()