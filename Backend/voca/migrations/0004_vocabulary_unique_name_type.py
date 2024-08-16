# Generated by Django 5.0.6 on 2024-08-16 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("voca", "0003_alter_word_word_word_unique_word_in_vocabulary"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="vocabulary",
            constraint=models.UniqueConstraint(
                fields=("name", "type"), name="unique_name_type"
            ),
        ),
    ]
