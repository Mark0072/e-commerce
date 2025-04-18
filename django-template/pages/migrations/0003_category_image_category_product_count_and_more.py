# Generated by Django 5.2 on 2025-04-08 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_initial_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(default=1, upload_to='categories/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='category',
            name='product_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
