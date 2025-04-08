from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    product_count = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def get_product_count(self, obj):
        return obj.products.count()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'image_url', 'product_count', 'created_at', 'updated_at']
        read_only_fields = ['product_count', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category = CategorySerializer(read_only=True)

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'image_url', 'category', 'stock', 'created_at', 'updated_at'] 