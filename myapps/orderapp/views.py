import time
from django.db.models import F, Sum
from django.http import JsonResponse,HttpResponseRedirect
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from orderapp.models import Cart,Order,OrderGoods
from userapp.models import User,Address


def myCart(request):
    #注意到时候要考虑用户未登录的情况
    userid = request.session.get('user_id')
    if userid:
        user = User.objects.get(id=userid)
        carts = user.cart_set.all()
        address = user.address_set.filter(isselect=True).first()
        allMoney = 0
        for cart in carts:
            if cart.isSelected:
                allMoney += cart.cnt * float(cart.products.price)  #购物车选中的商品总价格

        return render(request,'cart.html',{'carts':carts,
                                           'address':address,
                                           'allMoney':round(allMoney,2),
                                           'username':user.name})
    else:
        return render(request,'login1.html')

#选择购物车中的某件商品
def selectCart(request,option,cart_id):
    #option：0表示选择单个商品，1,表示全选，2表示全取消
    userid = request.session.get('user_id')
    if userid:
        if option == '1' or option == '2':
            carts = Cart.objects.filter(user_id=userid)  #查询到当前用户的所有购物车信息
            #更新isSelected
            carts.update(isSelected=True if option == '1' else False)
            #返回当前的总价格
            allMoney = 0
            if option == '1':
                for cart in carts:
                    allMoney += cart.cnt * float(cart.products.price)
            print(allMoney)
            return JsonResponse({
                'allMoney':allMoney,
                'status':'ok'
            })

        #单个点击时
        data = {'status':'ok','allMoney':0}
        try:
            cart = Cart.objects.get(id=cart_id)
            cart.isSelected = not cart.isSelected  #状态取反
            cart.save()
            data['allMoney'] = cart.cnt * float(cart.products.price),
            data['selected'] = cart.isSelected
        except:
            data['status'] = 'fail'
            data['allMoney'] = 0
        return JsonResponse(data)
    else:
        return render(request,'login1.html')

#减去某个商品的数量
def subPro(request,cart_id):
    data = {'status':'ok','price':0}
    if cart_id:
        cart = Cart.objects.get(id=cart_id)
        if cart.cnt > 1:
            cart.cnt -= 1  #减数量
            cart.save()
            data['price'] = cart.products.price  #拿到产品单价
        else:
            data['price'] = 0

    return JsonResponse(data)

#添加某个商品数量
#分为两种情况，第一种是在购物车对已有的商品添加，另一种是在商店第一次添加或对已有商品添加
def addPro(request,cart_id):
    userid = request.session.get('user_id')
    print(userid)
    if not userid:
        print('haha')
        return JsonResponse({'status':'login'})

    data = {'status': 'ok', 'price': 0}
    user = User.objects.get(id=userid)  #拿到用户信息
    cart = Cart.objects.filter(id=cart_id)  #拿到购物车对象
    if cart:
        cart = cart.first()
        #要考虑到一个库存，这里暂时先不做
        cart.cnt += 1
        cart.save()
        data['price'] = cart.products.price
        return JsonResponse(data)

    else:  #第一次添加到购物车或在商店添加已有商品
        #先查询购物车
        cart = Cart.objects.filter(products_id=cart_id,user_id=user.id)
        if cart:
            cart.update(cnt=F("cnt")+1)
            data['price'] = cart.products.price
            return JsonResponse(data)

        #创建购物车信息,商品数默认为1
        cart = Cart()
        cart.user_id = user.id
        cart.products_id = cart_id  #这里cart_id是商品的id
        cart.save()

        data['price'] = cart.products.price
        return JsonResponse(data)


def delCart(request,cart_id):
    # cart_id为0时表示删除清空购物车
    userid = request.session.get('user_id')
    if userid:
        if cart_id == '0':
            user = User.objects.get(id=userid)
            user.cart_set.all().delete()

        Cart.objects.get(id=cart_id).delete()  #删除指定商品

        return JsonResponse({'status':'ok','msg':'删除成功!'})
    else:
        return render(request, 'login1.html')

#生成订单号
def createOrderNo():
    no = '0029'+str(time.time()).replace('.','')[-8:]
    return no

#下订单（0）或者查询某个订单的详细信息
def toOrder(request,ordernum):
    userid = request.session.get('user_id')
    if not userid:
        return render(request,'login1.html')
    if ordernum == '0':
        #创建订单
        order = Order()
        order.orderNum = createOrderNo()
        order.user_id = userid
        #拿到当前用户默认地址的id
        order.order_address_id = User.objects.get(id=userid).address_set.filter(isselect=True).first().id

        #订单总金额，同时创建订单明细
        # 1.拿出所有购物车被选择的商品
        carts = Cart.objects.filter(isSelected=True,user_id=userid)

        # 未选择商品，一般不会出现，因为这种情况已被前端阻挡,但是后端也要做好
        if carts.count() == 0:
            return redirect('/order/mycart')
        # 2.计算总金额，创建每个单品的明细
        order.orderPrice = 0
        order.save()  #先保存订单信息，后面才能调用
        for cart in carts:
            order.orderPrice += cart.cnt * float(cart.products.price)

            #创建明细
            orderpros = OrderGoods()
            orderpros.order_id = order.orderNum
            orderpros.products_id = cart.products.pk  #pk是主键，用于不确定主键名为id时使用
            orderpros.cnt = cart.cnt
            orderpros.sumprice = cart.cnt * float(cart.products.price)
            orderpros.save()

        order.save()  #更新订单总额

        # 3.订单提交后，删除购物车中已提交的商品
        carts.delete()
    else:  #根据订单号查询订单
        order = Order.objects.get(pk=ordernum)

    return render(request,'toorder.html',{'order':order,'username':User.objects.get(id=userid).name})

#支付订单
def payOrder(request,ordernum,payType):
    #payType 支付类型：0余额，1支付宝，2微信
    try:
        #拿到订单
        order = Order.objects.get(pk=ordernum)

        userid = request.session.get('user_id')
        user = User.objects.filter(id=userid).first()
        if not user:
            return render(request,'login1.html')

        if user.money < order.orderPrice:  #余额不足
            return JsonResponse({'status':'fail','msg':'对不起，账户余额不足'})

        #支付成功
        user.money -= order.orderPrice
        user.save()
        order.payType = int(payType)
        order.payState = 1  #已支付
        order.orderState = 1  #待收货
        order.save()

        #给每个购买的商品增加销量
        for ordergood in order.ordergoods_set.all():  #拿到订单所有商品
            pro = ordergood.products
            pro.salenums = int(pro.salenums) + int(ordergood.cnt)  #添加销量
            pro.save()

    except:
        return JsonResponse({'status':'fail','msg':'支付失败'})
    else:
        return JsonResponse({'status':'ok','msg':'支付成功!'})


#所有订单
def orderList(request,state):
    # state:0全部订单，1待付款，2待收货，3待评价
    userid = request.session.get('user_id')
    if not userid:
        return render(request,'login1.html')

    user = User.objects.filter(id=userid).first()
    #取出当前登录用户的所有订单
    userOrders = user.order_set
    if state == '1':  #待支付
        orders = userOrders.filter(payState=0).order_by('-orderTime')
    elif state == '2':  #待收货
        orders = userOrders.filter(orderState=1,payState=1).order_by('-orderTime')
    elif state == '3':  #待评价
        orders = userOrders.filter(orderState=2,payState=1).order_by('-orderTime')
    elif state == '4':  # 交易完成
        orders = userOrders.filter(orderState=3).order_by('-orderTime')
    else:  #所有
        orders = userOrders.all().order_by('-orderTime')


    return render(request,'allorder.html',{
        'orders':orders,
        'state':state
    })

#个人中心
def myHome(request,state):
    userid = request.session.get('user_id')
    if userid:
        user = User.objects.get(id=userid)
        cart = user.cart_set.all()
        print(cart)
        if not cart:
            cartcnt = 0
        else:
            cartcnt = cart.aggregate(Sum('cnt')).get('cnt__sum')
        print(cartcnt)
        return render(request,'myhome.html',{
            'cartcnt': cartcnt,
            'username':user.name,
            'state':state
        })
    else:
        return render(request,'login1.html')

#做一个中间价，只要用户未登录，则只能去登录、注册、首页、商品展示页
# 删除或取消订单
def delOrder(request,ordernum,deltype):
    data = {'status':'ok0'}
    if deltype == '0':  #取消订单
        Order.objects.filter(orderNum=ordernum).update(orderState=4)  #取消订单
        data['msg'] = '订单取消成功!'
    else:
        Order.objects.filter(orderNum=ordernum).delete()  #删除订单
        data['status'] = 'ok1'
        data['msg'] = '订单删除成功!'
    return JsonResponse(data)


#收货地址管理
@csrf_exempt
def address(request,state,addrid):
    #state：对地址的操作，0 查看所有，1添加地址，2修改地址，3删除地址，4设为默认
    # addrid：地址id
    userid = request.session.get('user_id')
    if not userid:
        return render(request, 'login1.html')

    user = User.objects.filter(id=userid).first()
    if state == '1':  #创建地址
        addr = Address()
        addr.name = request.POST.get('name')
        addr.phone = request.POST.get('phone')
        addr.detailAddr = request.POST.get('address')
        addr.zipCode = request.POST.get('zipcode')
        addr.user_id = user.id
        addr.save()
        return JsonResponse({'status':'ok','addrid':addr.id})
    elif state == '2':
        addr = Address.objects.get(id=addrid)
        addr.name = request.POST.get('name')
        addr.phone = request.POST.get('phone')
        addr.detailAddr = request.POST.get('address')
        addr.zipCode = request.POST.get('zipcode')
        addr.save()
        return JsonResponse({'status':'ok','addrid':addr.id})
    elif state == '3':
        Address.objects.filter(id=addrid).delete()
        return JsonResponse({'status': 'ok', 'msg': '地址删除成功!'})
    elif state == '4':
        lastSel = Address.objects.filter(isselect=True)  #拿到之前被选为默认的地址
        lastid = ''
        if lastSel:  #先看之前有没有选择默认地址
            lastid = lastSel.first().id
            lastSel.update(isselect=False)  #将之前默认地址取消默认
            Address.objects.filter(id=addrid).update(isselect=True)  #将要设置默认的地址设置
        else:  #没有默认的话，就直接将要设置的改为默认
            Address.objects.filter(id=addrid).update(isselect=True)
        return JsonResponse({'status':'ok','lastid':lastid,'msg':'设置成功!'})

    addrs = Address.objects.filter(user_id=userid)
    return render(request,'address1.html',{'addrs':addrs})