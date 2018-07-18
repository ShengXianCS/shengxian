from django.shortcuts import render

# Create your views here.
def home(req):
    return render(req, 'home.html')

def prodshow(req):
    return render(req, 'productshow.html')

