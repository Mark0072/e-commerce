from django.core.management.base import BaseCommand
from django.core import serializers
from pages.models import Category, Product
import os
import json

class Command(BaseCommand):
    help = 'Exporta los datos de categorías y productos a un archivo JSON'

    def handle(self, *args, **options):
        # Crear el directorio fixtures si no existe
        fixtures_dir = os.path.join('pages', 'fixtures')
        if not os.path.exists(fixtures_dir):
            os.makedirs(fixtures_dir)

        # Exportar datos
        data = {
            'categories': [],
            'products': []
        }

        # Exportar categorías
        for category in Category.objects.all():
            category_data = {
                'model': 'pages.category',
                'pk': category.id,
                'fields': {
                    'name': category.name,
                    'description': category.description,
                    'image': str(category.image) if category.image else None,
                    'created_at': category.created_at.isoformat(),
                    'updated_at': category.updated_at.isoformat()
                }
            }
            data['categories'].append(category_data)

        # Exportar productos
        for product in Product.objects.all():
            product_data = {
                'model': 'pages.product',
                'pk': product.id,
                'fields': {
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price),
                    'image': str(product.image) if product.image else None,
                    'category': product.category.id,
                    'stock': product.stock,
                    'created_at': product.created_at.isoformat(),
                    'updated_at': product.updated_at.isoformat()
                }
            }
            data['products'].append(product_data)

        # Guardar en archivo
        output_file = os.path.join(fixtures_dir, 'initial_data.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        self.stdout.write(self.style.SUCCESS(f'Datos exportados exitosamente a {output_file}')) 