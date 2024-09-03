from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import F
from .models import Word, Vocabulary

@receiver(post_save, sender=Word)
def update_word_count_on_create(sender, instance, created, **kwargs):
    if created:
        Vocabulary.objects.filter(id=instance.vocabulary_id).update(word_count=F('word_count') + 1)

@receiver(post_delete, sender=Word)
def update_word_count_on_delete(sender, instance, **kwargs):
    Vocabulary.objects.filter(id=instance.vocabulary_id).update(word_count=F('word_count') - 1)