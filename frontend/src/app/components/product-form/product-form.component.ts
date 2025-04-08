import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, Category } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: null
  };
  selectedFile: File | null = null;
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  error = '';
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
    this.loadCategories();
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.error = 'Error al cargar el producto. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    // TODO: Implementar carga de categorías desde el backend
    // Por ahora usamos categorías de ejemplo
    this.categories = [
      { id: 1, name: 'Electrónicos', description: 'Productos electrónicos' },
      { id: 2, name: 'Ropa', description: 'Ropa y accesorios' },
      { id: 3, name: 'Hogar', description: 'Artículos para el hogar' }
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const formData = new FormData();
    formData.append('name', this.product.name || '');
    formData.append('description', this.product.description || '');
    formData.append('price', this.product.price?.toString() || '0');
    formData.append('stock', this.product.stock?.toString() || '0');
    formData.append('category', this.product.category?.id?.toString() || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          this.error = 'Error al actualizar el producto. Por favor, intente nuevamente.';
          this.loading = false;
        }
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.error = 'Error al crear el producto. Por favor, intente nuevamente.';
          this.loading = false;
        }
      });
    }
  }
} 