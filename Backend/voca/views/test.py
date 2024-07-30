import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@require_http_methods(['PUT'])
@csrf_exempt
def putTestAPI(request):
    print(request.PUT)
    print(request.FILES)
    
    # 파일 처리 로직 (예: 파일 저장, 내용 분석 등)
    
    return JsonResponse({'message': 'File uploaded successfully!'})
