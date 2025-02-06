import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; 
  newProduct: Product = {
    id: 0, 
    name: '',
    price: 0,
    createdDate: '',
  };
  editingProduct: Product = { id: 0, name: '', price: 0, createdDate: '' };


  constructor(private apiService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addProduct() {
    const productToSend = {
      name: this.newProduct.name,
      price: this.newProduct.price,
      createdDate: new Date().toISOString() 
    };

    this.apiService.addProduct(productToSend).subscribe({
      next: (product: Product) => {
        this.products.push(product); 
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding product:', error);
      },
    });
  }

  deleteProduct(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete product with undefined ID');
      return;
    }
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  startEditing(product: Product) {
    this.editingProduct = {
      id: product.id || 0, 
      name: product.name || '',
      price: product.price || 0,
      createdDate: product.createdDate || ''
    };
  }

  saveEdit() {
    if (this.editingProduct && this.editingProduct.id !== undefined) {
      this.apiService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
        next: () => {
          const index = this.products.findIndex((p) => p.id === this.editingProduct.id);
          if (index !== -1) {
            this.products[index] = { ...this.editingProduct };
          }
          this.editingProduct = { id: 0, name: '', price: 0, createdDate: '' };
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating product:', error);
        }
      });
    } else {
      console.error('Editing product or ID is undefined');
    }
  }

  cancelEdit() {
    this.editingProduct = { id: 0, name: '', price: 0, createdDate: '' };
  }

}
