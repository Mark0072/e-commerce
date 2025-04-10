from django.core.management.base import BaseCommand
from pages.models import Category, Product
import os
import json
from django.core.files import File
from django.conf import settings

class Command(BaseCommand):
    help = 'Importa los datos de categorías y productos desde un archivo JSON'

    def handle(self, *args, **options):
        input_file = os.path.join('pages', 'fixtures', 'initial_data.json')
        
        if not os.path.exists(input_file):
            self.stdout.write(self.style.ERROR(f'El archivo {input_file} no existe'))
            return

        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Importar categorías
        for category_data in data.get('categories', []):
            category, created = Category.objects.get_or_create(
                id=category_data['pk'],
                defaults={
                    'name': category_data['fields']['name'],
                    'description': category_data['fields']['description'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Categoría creada: {category.name}'))

        # Importar productos
        for product_data in data.get('products', []):
            category = Category.objects.get(id=product_data['fields']['category'])
            product, created = Product.objects.get_or_create(
                id=product_data['pk'],
                defaults={
                    'name': product_data['fields']['name'],
                    'description': product_data['fields']['description'],
                    'price': product_data['fields']['price'],
                    'category': category,
                    'stock': product_data['fields']['stock'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Producto creado: {product.name}'))

        self.stdout.write(self.style.SUCCESS('Datos importados exitosamente')) 