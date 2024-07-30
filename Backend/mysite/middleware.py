import cgi
from django.http import QueryDict
from django.core.files.uploadhandler import TemporaryFileUploadHandler, MemoryFileUploadHandler
from django.http.multipartparser import MultiPartParser

class PutParsingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'PUT' and request.content_type.startswith('multipart/form-data'):
            content_type, options = cgi.parse_header(request.META.get('CONTENT_TYPE', ''))
            if content_type == 'multipart/form-data':
                request.upload_handlers.insert(0, MemoryFileUploadHandler(request))
                request.upload_handlers.insert(1, TemporaryFileUploadHandler(request))
                
                parser = MultiPartParser(request.META, request, request.upload_handlers)
                request.PUT, request._files = parser.parse()
                
                # Populate request.FILES from _files
                request.FILES.update(request._files)
        response = self.get_response(request)
        print(request.PUT, request._files)
        return response
