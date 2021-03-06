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


from myapps.userapp import views

urlpatterns = [

    url(r'^login',views.login),
    url(r'^logout',views.logout),
    url(r'^regist',views.regist),
    url(r'^addAddress',views.addAddress),
    url(r'^myAddress/(?P<user_id>\d+)/',views.myAddress),
    # url(r^myAddress',views.myAddress),
    url(r'^code',views.code),
    url(r'^verify/(?P<iptcode>[0-9a-zA-Z]+)',views.verifyCode),  #验证验证码
    url(r'^verifyName/(?P<uname>.+)',views.verifyName),  #验证用户名是否已存在
]
