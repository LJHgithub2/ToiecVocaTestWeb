# myapp/utils.py
import jwt
from datetime import datetime, timedelta
from django.conf import settings

SECRET_KEY = 'your-secret-key'  # 실제 프로젝트에서는 settings.py에서 가져오는 것을 권장

def generate_access_token(user):
    token_payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': datetime.utcnow() + timedelta(hours=1),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')
    return token

def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None