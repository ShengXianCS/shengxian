# Generated by Django 2.0.7 on 2018-07-18 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0002_auto_20180718_1728'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='isselect',
            field=models.BooleanField(default=True, verbose_name='默认地址'),
        ),
    ]