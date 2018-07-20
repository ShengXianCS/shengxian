from django.shortcuts import render

from userapp.models import User
from orderapp.models import Cart
from productapp.models import ProdTyp, Products
from django.db.models import *  #导入聚合函数

def home(req):
    userid=1
    user = User.objects.get(id=userid)
    cart = user.cart_set
    if cart:
        cartcnt = 0
    else:
        cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')
    return render(req, 'home.html', {
        'prodTyps':ProdTyp.objects.all().order_by('typesort'),
        'cartcnt': cartcnt
    })

# , 'productlist': Products.objects.filter(prodTyp__typeid=id)

def prodshow(req,sortid=0,categoryid=0,chilid=0):
    productsList = None

    sortColumn = 'salenums'
    if sortid == 1:
        sortColumn = '-price'
    elif sortid == 2:
        sortColumn ='price'
    childTypes = []

    if categoryid:
        cTypes = ProdTyp.objects.filter(typeid = categoryid).last().productname
        cTypes = cTypes.split('')
        for ctype in cTypes:
            ctype = ctype.splist()
            childTypes.append({'name':ctype[0],'id':ctype[1]})

        if chilid:
            productsList = Products.objects.filter(categoryid=categoryid,chilid=chilid).order_by(sortColumn)
        else:
            productsList = Products.objects.filter(categoryid=categoryid).order_by(sortColumn)
    else:
        productsList = Products.objects.all().order_by(sortColumn)[0:10]
    return render(req,'productshow.html',
                  {'productTypes':ProdTyp.objects.order_by('typeid'),
                   'productsList':productsList,
                   'categoryid':str(categoryid),
                   'childTypes':childTypes,
                   'chilid':str(chilid),
                   'sortid':sortid})
def prodshow1(req,id,sortid=0,categoryid=0,chilid=0):
    productslist = None
    userid = 1
    user = User.objects.get(id=userid)
    cart = user.cart_set
    if cart:
        cartcnt = 0
    else:
        cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')
    sortColumn = 'salenums'
    if sortid == 1:
        sortColumn = '-price'
    elif sortid == 2:
        sortColumn = 'price'
        childTypes = []

        if categoryid:
            cTypes = ProdTyp.objects.filter(typeid=categoryid).last().productname
            cTypes = cTypes.split('')
            for ctype in cTypes:
                ctype = ctype.splist()
                childTypes.append({'name': ctype[0], 'id': ctype[1]})

            if chilid:
                productsList = Products.objects.filter(categoryid=categoryid, chilid=chilid).order_by(sortColumn)
            else:
                productsList = Products.objects.filter(categoryid=categoryid).order_by(sortColumn)
        else:
            productsList = Products.objects.all().order_by(sortColumn)[0:10]
        return render(req, 'productshow.html',
                      {'productTypes': ProdTyp.objects.order_by('typeid'),
                       'productsList': productsList,
                       'categoryid': str(categoryid),
                       'childTypes': childTypes,
                       'chilid': str(chilid),
                       'sortid': sortid,
                       'cartcnt': cartcnt})  #购物车商品总数
    prodTyps= ProdTyp.objects.all()
    return render(req,'productshow.html', {'productlist': Products.objects.filter(typeid=id).all(),
                                           'cartcnt': cartcnt})