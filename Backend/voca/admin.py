from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Word, Vocabulary

admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Word)
admin.site.register(Vocabulary)


# # 사용자 모델의 관리 클래스 정의
# class CustomUserAdmin(UserAdmin):
#     # Admin 패널에서 보여질 필드들
#     list_display = ('username', 'id','email', 'first_name', 'last_name', 'is_staff', 'is_active')
#     # Admin 패널에서 필터링할 수 있는 필드들
#     list_filter = ('is_staff', 'is_active')
#     # Admin 패널에서 검색할 수 있는 필드들
#     search_fields = ('username', 'email', 'first_name', 'last_name')
#     # 상세 보기 및 수정 페이지의 필드셋 설정
#     fieldsets = (
#         (None, {'fields': ('id',)}),
#         ('Personal info', {'fields': ('username', 'email', 'first_name', 'last_name')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )
#     # ID 필드를 읽기 전용으로 설정
#     readonly_fields = ('id',)

# # 사용자 모델과 관리 클래스를 등록
# admin.site.register(User, CustomUserAdmin)
# admin.site.register(Profile)
