from django.http import HttpResponse
from .models import Question
from django.template import loader
from django.shortcuts import get_object_or_404, render


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    template = loader.get_template("myapp/index.html")
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
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)