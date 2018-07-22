import hashlib
import random
import re
import uuid

from PIL import Image, ImageDraw, ImageFont
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from io import BytesIO

from userapp.models import User, Address


def jiami(passwd):
    md5=hashlib.md5()
    md5.update(passwd.encode())
    return md5.hexdigest()

def newToken(username):
    md5=hashlib.md5()
    md5.update((str(uuid.uuid4())+username).encode())
    return md5.hexdigest()

def login(req):
    if req.method=='GET':
        return render(req,'login1.html')
    phone=req.POST.get('name')
    passwd=req.POST.get('passwd')
    print('______________________________',phone)
    qs=User.objects.filter(phone=phone,passwd=jiami(passwd))
    # qs=User.objects.filter(phone=phone,passwd=passwd)

    if qs.exists():
        print('***')
        user=qs.first()
        req.session['user_id']=user.id  # 向session存放user.id,用于购物车
        user.save()
        resp=redirect('/sy/home')
        resp.set_cookie('token',newToken(user.name))  # 向客户端添加token
        return resp

    else:
        return render(req,'login1.html',{'errorMsg':'用户登录失败'})

def regist(request):
    if request.method=='GET':
        return render(request,'regist.html')
    inputCode=request.POST.get('code')
    sessionCode=request.session.get('code')
    if inputCode == sessionCode:
        print('验证码输入正确')
        user=User()
        user.name=request.POST.get('name')
        user.passwd=jiami(request.POST.get('passwd2'))
        user.email=request.POST.get('email')
        user.phone=request.POST.get('phone')

        user.save()

        print('{}保存成功'.format(user.id))
        return redirect('/user/login')
    else:
        return HttpResponse('验证码输入不正确。。。刷新图片，重新输入')




def myAddress(req,user_id):
# def myAddress(req):
    # user_id=req.session.get('user_id')
    myAddrs=Address.objects.filter(user_id=user_id)
    return render(req, 'address.html', {'myAddrs':myAddrs})


def logout(req):
    resp=redirect('user/login')
    if req.COOKIES.get('token'):
        # 将用户的token=‘'
        User.objects.filter(token=req.COOKIES.get('token')).update(token='')
        resp.delete_cookie('token')  # 删除cookie的token
        del req.session['user_id']
    return resp


def code(req):
    # 1. 创建画布Image对象
    img = Image.new(mode='RGB', size=(120, 40), color=(220, 220, 180))

    # 2. 创建画笔 ImageDraw对象
    draw = ImageDraw.Draw(img, 'RGB')

    # 3. 画文本，画点，画线
    # 随机产生0-9, A-Z, a-z范围的字符
    chars = ''
    while len(chars) < 4:
        flag = random.randrange(3)
        char = chr(random.randint(48, 57)) if not flag else \
            chr(random.randint(65, 90)) if flag == 1 else \
                chr(random.randint(97, 122))
        # 排除重复的
        if len(chars) == 0 or chars.find(char) == -1:
            chars += char

    # 将生成的验证码的字符串存入到session中
    req.session['code'] = chars

    font = ImageFont.truetype(font='static/fonts/hktt.ttf', size=25)
    for char in chars:
        xy = (15 + chars.find(char) * 20, random.randrange(2, 8))
        draw.text(xy=xy,
                  text=char,
                  fill=(255, 0, 0),
                  font=font)
    for i in range(200):
        xy = (random.randrange(120), random.randrange(30))
        color = (random.randrange(255),
                 random.randrange(255),
                 random.randrange(255))
        draw.point(xy=xy, fill=color)

    # 4. 将画布对象转成字节数据
    buffer = BytesIO()  # 缓存
    img.save(buffer, 'png')  # 指定的图片格式为png

    # 5. 清场(删除对象的引用)
    del draw
    del img
    return HttpResponse(buffer.getvalue(),  # 从BytesIO对象中获取字节数据
                        content_type='image/png')
