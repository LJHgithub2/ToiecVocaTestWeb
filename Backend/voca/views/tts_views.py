from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .user_views import login_required_json
from pathlib import Path
import os
from django.http import JsonResponse
from django.conf import settings
from openai import OpenAI
from django.urls import reverse

api_key = os.getenv('GPT_API_KEY')
organization = os.getenv('ORG_ID')

client = OpenAI(
    organization=organization,
    api_key=api_key
)

@csrf_exempt
@require_http_methods(["POST"])
@login_required_json
def tts(request):
    text = request.POST.get('text', 'Hello, world!')

    # 미디어 파일 저장 경로 설정
    media_dir = Path(settings.MEDIA_ROOT) / 'tts_audio'
    media_dir.mkdir(parents=True, exist_ok=True)

    # 파일명 설정 (안전한 파일명 생성)
    safe_filename = "".join([c for c in text[:10] if c.isalnum() or c in (' ', '-', '_')]).rstrip()
    file_name = f"{safe_filename}_{hash(text)}.mp3"
    file_path = media_dir / file_name

    try:
        # 파일이 존재하지 않으면 생성
        if not file_path.exists():
            # OpenAI TTS 요청
            response = client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=text,
            )

            # 응답에서 오디오 콘텐츠 추출 및 파일 저장
            with open(file_path, 'wb') as f:
                for chunk in response.iter_bytes():
                    f.write(chunk)

        # 파일의 URL 생성
        file_url = request.build_absolute_uri(settings.MEDIA_URL + f'tts_audio/{file_name}')

        # JSON 응답 반환
        return JsonResponse({
            'audio_url': file_url,
            'filename': file_name
        })

    except Exception as e:
        # 오류 처리
        return JsonResponse({'error': str(e)}, status=500)