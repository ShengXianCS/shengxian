from django.shortcuts import render


# Create your views here.
from myapps.productapp.models import ProdTyp, Products


def home(req):
    return render(req, 'home.html', {'prodTyps':ProdTyp.objects.all()})

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
                       'sortid': sortid})
    prodTyps= ProdTyp.objects.all()
    return render(req,'productshow.html', {'productlist': Products.objects.filter(typeid=id).all()})