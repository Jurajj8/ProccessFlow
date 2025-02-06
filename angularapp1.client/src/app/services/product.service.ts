import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Product {
  id?: number;
  name: string;
  price: number;
  createdDate: String;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private ApiURL = environment.apiURL + '/products'; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ApiURL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.ApiURL}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.ApiURL, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.ApiURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiURL}/${id}`);
  }
}
