from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .forms import CategoryForm

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# Vista para el panel de administración
def category_list(request):
    categories = Category.objects.all()
    return render(request, 'pages/category_list.html', {'categories': categories})

def category_create(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Categoría creada exitosamente.')
            return redirect('category_list')
    else:
        form = CategoryForm()
    return render(request, 'pages/category_form.html', {'form': form})

def category_edit(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES, instance=category)
        if form.is_valid():
            form.save()
            messages.success(request, 'Categoría actualizada exitosamente.')
            return redirect('category_list')
    else:
        form = CategoryForm(instance=category)
    return render(request, 'pages/category_form.html', {'form': form, 'category': category})

def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        category.delete()
        messages.success(request, 'Categoría eliminada exitosamente.')
        return redirect('category_list')
    return render(request, 'pages/category_confirm_delete.html', {'category': category})

# Vista para la API
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
