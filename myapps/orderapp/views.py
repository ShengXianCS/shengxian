from django.shortcuts import render

# Create your views here.
def myCart(request):
    return render(request,'cart.html')