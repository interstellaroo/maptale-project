# Generated by Django 5.1.4 on 2025-01-13 19:22

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_mgmt', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pin',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('map', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pins', to='content_mgmt.map')),
                ('note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pins', to='content_mgmt.note')),
            ],
        ),
    ]
