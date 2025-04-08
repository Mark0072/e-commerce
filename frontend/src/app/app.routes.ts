import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'products/new',
    component: ProductFormComponent
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
