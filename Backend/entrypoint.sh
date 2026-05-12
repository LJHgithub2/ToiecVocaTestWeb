#!/bin/sh

python manage.py migrate

python manage.py shell -c "
from django.contrib.auth import get_user_model
from voca.models import Profile
User = get_user_model()
import os
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
if username and password and not User.objects.filter(username=username).exists():
    user = User.objects.create_superuser(username=username, password=password, email='')
    Profile.objects.create(user=user)
    print(f'Superuser {username} and Profile created.')
else:
    print('Superuser already exists or credentials not set.')
"

python manage.py runserver 0.0.0.0:8000
