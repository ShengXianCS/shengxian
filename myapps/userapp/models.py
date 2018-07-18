from django.db import models

# Create your models here.

class User(models.Model):
    name=models.CharField(max_length=50,verbose_name='用户名')
    email=models.CharField(max_length=50,unique=True,null=False)
    phone=models.CharField(max_length=12,unique=True,null=False)
    passwd=models.CharField(max_length=100,null=False)
    photo=models.FileField(upload_to='upload')
    state=models.BooleanField(default=True,verbose_name='用户状态')
    money=models.DecimalField(default=0,max_digits=20,decimal_places=2)

    def delete(self, using=None, keep_parents=False):
        self.state=False
        self.save()
        return '已注销'
    class Meta:
        db_table='sx_users'


class Address(models.Model):
    name=models.CharField(null=False,max_length=50,verbose_name='收货人姓名')
    detailAddr=models.TextField(null=False,verbose_name='详细收货地址')
    phone=models.CharField(max_length=12,null=False)
    zipCode=models.IntegerField(null=True,verbose_name='邮编')
    user=models.ForeignKey(User,on_delete=models.CASCADE) #级联删除
    class Meta:
        db_table='sx_address'