import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  loading = true;
  error = '';

  constructor(
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Productos recibidos:', products);
        this.allProducts = products;
        this.products = [...this.allProducts];
        
        // Extraer categorías únicas de los productos
        const uniqueCategories = new Map<number, Category>();
        products.forEach(product => {
          if (product.category) {
            uniqueCategories.set(product.category.id, product.category);
          }
        });
        this.categories = Array.from(uniqueCategories.values());
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  filterProducts(category: Category | null): void {
    console.log('Filtrando por categoría:', category);
    this.selectedCategory = category;
    
    if (!category) {
      this.products = [...this.allProducts];
    } else {
      this.products = this.allProducts.filter(product => 
        product.category?.id === category.id
      );
    }
    
    console.log('Productos filtrados:', this.products);
  }

  addToCart(product: Product): void {
    // TODO: Implementar lógica del carrito
    console.log('Producto agregado al carrito:', product);
  }
} 