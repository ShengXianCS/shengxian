from django.shortcuts import render


# Create your views here.
from myapps.productapp.models import ProdTyp, Products


def home(req):
    return render(req, 'home.html',
                  {'prodTyps':ProdTyp.objects.all()})


def prodshow1(req, sortid=0, categoryid=0, chilid=0):
    productslist = None

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
                   'productlist':Products.objects.filter(typeid=categoryid).all()})

    # return render(req, 'productshow.html', {'productlist': Products.objects.filter(typeid=categoryid).all()})
