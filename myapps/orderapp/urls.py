"""ZLShengXian URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from myapps import orderapp
from myapps.orderapp import views

urlpatterns = [
    url(r'^mycart$',views.myCart),
    url(r"^select/(?P<option>[012])/(?P<cart_id>\d+)$",views.selectCart),  #选择商品
    url(r'^subpro/(?P<cart_id>\d+)$',views.subPro),  #减少商品
    url(r'^addpro/(?P<cart_id>\d+)$',views.addPro),  #增加商品
    url(r'^delcart/(?P<cart_id>\d+)$',views.delCart),  #删除商品
    url(r'^toorder/(?P<ordernum>\d+)$',views.toOrder),  #下订单或查看订单详细
    url(r'^pay/(?P<ordernum>\d+)/(?P<payType>[012])$',views.payOrder),  #支付订单
    url(r'^allorder/(?P<state>[01234])$',views.orderList),  #订单管理
    url(r'^test',TemplateView.as_view(template_name='myhome.html'))
]
