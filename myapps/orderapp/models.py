from django.db import models
from userapp.models import User,Address
from productapp.models import Products

# Create your models here.

#购物车
class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)  #用户
    products = models.ForeignKey(Products,on_delete=models.CASCADE)  #购买商品

    #数量
    cnt = models.IntegerField(default=1)
    #是否被选择，提交订单时使用
    isSelected = models.BooleanField(default=True)

    class Meta:
        db_table = 'sx_cart'


#订单
class Order(models.Model):
    #单号
    orderNum = models.CharField(primary_key=True,max_length=50,verbose_name='订单号')
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    #订单收货地址
    order_address = models.ForeignKey(Address,on_delete=models.SET_NULL,null=True)

    #订单总金额
    orderPrice = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    #支付状态
    pay_state = (
        (0,'待支付'),
        (1,'已支付'),
        (2,'已退款'),
    )

    payState = models.IntegerField(choices=pay_state,default=0)

    #支付方式
    pay_types = (
        (0,'余额'),
        (1,'支付宝'),
        (2,'微信')
    )
    payType = models.IntegerField(choices=pay_types,default=0)

    #订单状态
    order_state = (
        (0,'待支付'),
        (1,'待收货'),
        (2,'待评价'),
        (3,'已评价'),
        (4,'已取消')
    )
    orderState = models.IntegerField(choices=order_state,default=0)

    @property
    def payStateName(self):
        return self.pay_state[self.payState][1]

    @property
    def payTypeName(self):
        return self.pay_types[self.payType][1]

    @property
    def orderStateName(self):
        return self.order_state[self.orderState][1]

    #下订单时间
    orderTime = models.DateTimeField(auto_now_add=True)

    #订单信息最后一次修改时间
    orderChangeTime = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'sx_order'


#订单明细
class OrderGoods(models.Model):
    #订单
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    #商品
    products = models.ForeignKey(Products,on_delete=models.SET_NULL,null=True)
    #商品数量
    cnt = models.IntegerField(default=1)
    #商品小计
    sumprice = models.DecimalField(max_digits=10,decimal_places=2,default=0,verbose_name='某种商品的总价')

    class Meta:
        db_table = 'sx_ordergoods'