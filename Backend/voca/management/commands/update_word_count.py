from django.core.management.base import BaseCommand
from voca.models import Vocabulary

class Command(BaseCommand):
    help = 'Update word count for all Vocabulary entries'

    def handle(self, *args, **options):
        vocabularies = Vocabulary.objects.all()
        for vocab in vocabularies:
            vocab.word_count = vocab.word_set.count()
            vocab.save()
        self.stdout.write(self.style.SUCCESS('Successfully updated word counts'))