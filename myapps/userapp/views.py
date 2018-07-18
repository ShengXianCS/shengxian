from django.shortcuts import render

# Create your views here.

def login(req):
    return render(req,'login.html')


def regist(request):
    return render(request,'register.html')


def addr(request):
    return render(request,'address.html')