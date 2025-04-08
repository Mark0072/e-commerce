from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, 
    CategoryViewSet,
    category_list,
    category_create,
    category_edit,
    category_delete
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    # API URLs
    path('api/', include(router.urls)),
    
    # Admin URLs
    path('categories/', category_list, name='category_list'),
    path('categories/new/', category_create, name='category_create'),
    path('categories/<int:pk>/edit/', category_edit, name='category_edit'),
    path('categories/<int:pk>/delete/', category_delete, name='category_delete'),
] 