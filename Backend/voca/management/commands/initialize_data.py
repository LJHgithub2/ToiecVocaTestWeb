# myapp/management/commands/initialize_data.py
# python manage.py initialize_data 를 통한 실행

import pandas as pd
from django.core.management.base import BaseCommand
from voca.models import Vocabulary, Word, User
from django.conf import settings  # Django 설정을 가져오기 위해 사용
import os

def modify_duplicates(df):
    # 중복된 영단어에 고유한 식별자를 추가
    df['modified_word'] = df.groupby('영단어').cumcount() + 1
    df['영단어'] = df.apply(lambda row: f"{row['영단어']}_{row['modified_word']}" if row['modified_word'] > 1 else row['영단어'], axis=1)
    df.drop(columns=['modified_word'], inplace=True)

class Command(BaseCommand):
    help = 'Initialize data in the database'

    def handle(self, *args, **kwargs):
        # 슈퍼유저 조회는 handle 메서드 내에서 수행
        superuser = User.objects.filter(is_superuser=True).first()

        if not superuser:
            self.stdout.write(self.style.ERROR("No superuser found. Please create a superuser first."))
            return
        
        # Excel 파일 경로 설정
        excel_file_path = os.path.join(settings.BASE_DIR, 'data', 'toeic_word(update).xlsx')
        
        # 파일 경로 확인 및 읽기
        if not os.path.exists(excel_file_path):
            self.stdout.write(self.style.ERROR(f'File not found: {excel_file_path}'))
            return
        
        try:
            df = pd.read_excel(excel_file_path, sheet_name='word') 
            modify_duplicates(df)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error reading Excel file: {e}"))
            return

        # Vocabulary 객체 생성
        vocabulary = Vocabulary.objects.filter(name="hackers voca").first()
        if not vocabulary:
            vocabulary = Vocabulary.objects.create(
                name="hackers voca",
                description="헤커스 노랭이 단어장입니다.",
                type="0",
                rank=1,
                owner=superuser
            )
            self.stdout.write(self.style.SUCCESS("Vocabulary created with superuser as owner."))
        else:
            self.stdout.write(self.style.WARNING("Vocabulary already exists."))

        # DataFrame의 각 행을 반복하며 Word 객체를 생성
        for index, row in df.iterrows():
            # 품사 정보 추출 ('명사' 부분 추출)
            part_of_speech = row['영단어'].split('(')[1].rstrip(')') if '(' in row['영단어'] else ''

            # Word 모델 인스턴스를 생성하고 데이터 할당
            word = Word(
                vocabulary=vocabulary,
                word=row['영단어'],
                mean=row['단어뜻'],
                chapter=row['day'],
                part_of_speech=part_of_speech,
                correct_count=row['정답'],
                incorrect_count=row['오답'],
                last_attempt_incorrect=row['최근오답여부']
            )
            word.save()

        self.stdout.write(self.style.SUCCESS("데이터 초기화 완료"))