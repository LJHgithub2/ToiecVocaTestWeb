from django.http import HttpResponse, HttpResponseRedirect
from .models import Question,Choice
# from django.template import loader
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.db.models import F


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    #template = loader.get_template("myapp/index.html")
    context = {
        "latest_question_list": latest_question_list,
    }
    # return HttpResponse(template.render(context, request))
    # 단축기능(shortcuts)
    return render(request, "myapp/index.html", context)

def detail(request, question_id):
    ## 질문이 없다면 에러 발생
    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist")
    # 404에러 단축
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "myapp/detail.html", {"question": question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "myapp/results.html", {"question": question})


def vote(request, question_id):
    if request.method == 'GET':
        # 요청이 get방식으로 왔을때 처리
        pass
    elif request.method == 'POST':
        
        question = get_object_or_404(Question, pk=question_id)
        try:
            selected_choice = question.choice_set.get(pk=request.POST["choice"])
        except (KeyError, Choice.DoesNotExist):
            # Redisplay the question voting form.
            return render(
                request,
                "myapp/detail.html",
                {
                    "question": question,
                    "error_message": "You didn't select a choice.",
                },
            )
        else:
            # F("속성값")함수는 DB 값을 업데이트할때 메모리에 가져오지 않고 DB 명령어를 통해 직접적인 업데이트
            selected_choice.votes = F("votes") + 1
            selected_choice.save()
            # Always return an HttpResponseRedirect after successfully dealing
            # with POST data. This prevents data from being posted twice if a
            # user hits the Back button.
            return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))