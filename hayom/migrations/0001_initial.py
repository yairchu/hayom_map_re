# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SimulationResult',
            fields=[
                ('params', models.CharField(primary_key=True, max_length=1000, serialize=False)),
                ('results', models.BinaryField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
