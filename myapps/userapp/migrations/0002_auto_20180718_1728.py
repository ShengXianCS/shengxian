# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-18 09:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.FileField(null=True, upload_to='upload'),
        ),
    ]
