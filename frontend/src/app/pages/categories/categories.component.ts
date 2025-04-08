import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.error = null;

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.error = 'Error al cargar las categorías. Por favor, intente nuevamente.';
        this.loading = false;
      }
    });
  }
} 