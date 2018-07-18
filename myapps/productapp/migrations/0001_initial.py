# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-18 06:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProdTyp',
            fields=[
                ('typeid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('typename', models.CharField(max_length=50)),
                ('typesort', models.IntegerField(default=1)),
            ],
            options={
                'db_table': 'sx_producttypes',
            },
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('productid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('productname', models.CharField(max_length=100)),
                ('productimg', models.CharField(max_length=300)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('salenums', models.BigIntegerField(default=0)),
                ('type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='productapp.ProdTyp')),
            ],
            options={
                'db_table': 'sx_products',
            },
        ),
    ]
