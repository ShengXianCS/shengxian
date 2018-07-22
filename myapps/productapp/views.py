from django.shortcuts import render
from userapp.models import User
from orderapp.models import Cart
from productapp.models import ProdTyp, Products
from django.db.models import *  #导入聚合函数

def home(req):
    userid = req.session.get('user_id')
    cartcnt = 0
    if userid:
        user = User.objects.get(id=userid)
        cart = user.cart_set.all()
        if not cart:
            cartcnt = 0
        else:
            cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')
        return render(req, 'home.html', {
            'prodTyps':ProdTyp.objects.all().order_by('typesort'),
            'cartcnt': cartcnt,
            'username':user.name
        })
    else:
        return render(req, 'home.html', {
            'prodTyps': ProdTyp.objects.all().order_by('typesort'),
            'cartcnt': cartcnt
        })


def prodshow(req, categoryid, sortid=0):
    userid = req.session.get('user_id')
    cartcnt = 0
    username = ''
    if userid:
        user = User.objects.get(id=userid)
        username = user.name
        cart = user.cart_set.all()
        if not cart:
            cartcnt = 0
        else:
            cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')

    sortColumn = 'productid'
    if sortid == '1':
        sortColumn = '-price'
    elif sortid == '2':
        sortColumn = 'price'
    elif sortid == '3':
        sortColumn = '-salenums'
    productlist=Products.objects.filter(typeid=categoryid).all()
    if categoryid:
        productlist = productlist.order_by(sortColumn)

    return render(req, 'productshow.html',
                  {'categoryid': categoryid,
                   'sortid': sortid,
                   'cartcnt': cartcnt,
                   'productlist': productlist,
                   'username':username})
