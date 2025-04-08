from django.db import migrations

def create_initial_categories(apps, schema_editor):
    Category = apps.get_model('pages', 'Category')
    
    categories = [
        {
            'name': 'Electrónicos',
            'description': 'Productos electrónicos y dispositivos tecnológicos'
        },
        {
            'name': 'Ropa',
            'description': 'Ropa y accesorios de moda'
        },
        {
            'name': 'Hogar',
            'description': 'Artículos para el hogar y decoración'
        },
        {
            'name': 'Deportes',
            'description': 'Equipamiento deportivo y accesorios'
        }
    ]
    
    for category_data in categories:
        Category.objects.create(**category_data)

def reverse_migration(apps, schema_editor):
    Category = apps.get_model('pages', 'Category')
    Category.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_categories, reverse_migration),
    ] 