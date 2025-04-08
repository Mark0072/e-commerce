import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products/';

  constructor(private http: HttpClient) {
    console.log('ProductService inicializado con URL:', this.apiUrl);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}\nURL: ${error.url}`;
    }
    console.error('Error en ProductService:', errorMessage);
    console.error('Detalles del error:', error);
    return throwError(() => new Error(errorMessage));
  }

  getProducts(): Observable<Product[]> {
    console.log('Intentando obtener productos de:', this.apiUrl);
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        tap(response => console.log('Respuesta recibida:', response)),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${id}/`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }
} 