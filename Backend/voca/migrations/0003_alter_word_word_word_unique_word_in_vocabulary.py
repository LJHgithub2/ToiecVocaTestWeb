# Generated by Django 5.0.6 on 2024-07-29 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("voca", "0002_alter_vocabulary_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="word",
            name="word",
            field=models.CharField(max_length=100),
        ),
        migrations.AddConstraint(
            model_name="word",
            constraint=models.UniqueConstraint(
                fields=("vocabulary", "word"), name="unique_word_in_vocabulary"
            ),
        ),
    ]
