import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product, ProductType } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

interface Category {
  name: string;
  description: string;
  icon: string;
}

interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [
    {
      name: 'Electrónicos',
      description: 'Los mejores dispositivos electrónicos y gadgets',
      icon: 'fas fa-laptop'
    },
    {
      name: 'Ropa',
      description: 'Moda para todas las estaciones',
      icon: 'fas fa-tshirt'
    },
    {
      name: 'Hogar',
      description: 'Todo para tu hogar y decoración',
      icon: 'fas fa-home'
    },
    {
      name: 'Deportes',
      description: 'Equipamiento deportivo y accesorios',
      icon: 'fas fa-running'
    }
  ];

  featuredProducts: ProductType[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  specialOffers: SpecialOffer[] = [
    {
      id: 1,
      title: 'Oferta del Día',
      description: 'Descuentos especiales en productos seleccionados',
      image: 'assets/images/offers/daily-offer.jpg',
      link: '/products?offer=daily'
    },
    {
      id: 2,
      title: 'Black Friday',
      description: 'Las mejores ofertas del año',
      image: 'assets/images/offers/black-friday.jpg',
      link: '/products?offer=black-friday'
    }
  ];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Productos recibidos:', products);
        if (products && products.length > 0) {
          // Tomamos los primeros 4 productos como destacados
          this.featuredProducts = products.slice(0, 4);
        } else {
          this.error = 'No hay productos disponibles';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'Error al cargar los productos destacados. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
} 