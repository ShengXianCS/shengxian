from django.db import models
# Create your models here.
class ProdTyp(models.Model):
    typeid = models.CharField(max_length=10,primary_key=True)
    typename = models.CharField(max_length=50)

    class Meta:
        db_table = 'sx_producttypes'

class Products(models.Model):
    productid = models.CharField(primary_key=True,max_length=10)
    productname = models.CharField(max_length=100)
    productimg = models.CharField(max_length=300)
    price = models.DecimalField(default=0.0,max_digits=10,decimal_places=2)
    salenums = models.BigIntegerField(default=0)
    typeid = models.CharField(max_length=20,default='')

    class Meta:
        db_table = 'sx_products'
