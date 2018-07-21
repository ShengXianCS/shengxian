from django.shortcuts import render


# Create your views here.
from productapp.models import ProdTyp, Products


def home(req):
    return render(req, 'home.html',
                  {'prodTyps':ProdTyp.objects.all()})

def prodshow(req, categoryid, sortid=0):
    sortColumn = 'productid'
    if sortid == '1':
        sortColumn = '-price'
    elif sortid == '2':
        sortColumn = 'price'
    elif sortid == '3':
        sortColumn = 'salenums'
    productlist=Products.objects.filter(typeid=categoryid).all()
    if categoryid:
        productlist = productlist.order_by(sortColumn)

    return render(req, 'productshow.html',
                  {'categoryid': categoryid,
                   'sortid': sortid,
                   'productlist': productlist})
