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
        cart = user.cart_set
        if cart:
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


def prodshow1(req, sortid=0, categoryid=0, chilid=0):
    productslist = None

    userid = 1
    user = User.objects.get(id=userid)
    cart = user.cart_set
    if cart:
        cartcnt = 0
    else:
        cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')
    
    sortColumn = 'productid'
    if sortid == 1:
        sortColumn = '-price'
    elif sortid == 2:
        sortColumn = 'price'
    elif sortid == 3:
        sortColumn = 'salenums'
    childTypes = []

    if categoryid:

        productlist = Products.objects.filter(typeid=categoryid).all().order_by(sortColumn)

        cTypes = ProdTyp.objects.filter(typeid=categoryid).last().productname
        cTypes = cTypes.split('')
        for ctype in cTypes:
            ctype = ctype.splist()
            childTypes.append({'name': ctype[0], 'id': ctype[1]})

        if chilid:
            productslist = Products.objects.filter(categoryid=categoryid, chilid=chilid).order_by(sortColumn)
        else:
            productslist = Products.objects.filter(categoryid=categoryid).order_by(sortColumn)

    else:
        productslist = Products.objects.all().order_by(sortColumn)[0:10]
    return render(req, 'productshow.html',
                  {'productTypes': ProdTyp.objects.order_by('typeid'),
                   'categoryid': str(categoryid),
                   'childTypes': childTypes,
                   'chilid': str(chilid),
                   'sortid': sortid,
                   'productlist':Products.objects.filter(typeid=categoryid).all(),
                  'cartcnt': cartcnt})

    # return render(req, 'productshow.html', {'productlist': Products.objects.filter(typeid=categoryid).all()})
