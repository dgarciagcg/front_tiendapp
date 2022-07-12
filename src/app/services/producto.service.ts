import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  ruta = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  saveProducto = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/producto/save-producto`, data);
  }

  getProducto = (id_producto: number): Observable<Producto> => {
    return this.http.get<Producto>(`${this.ruta}/producto/traer-producto/${id_producto}`);
  }

  getProductos = (): Observable<Producto[]> => {
    return this.http.get<Producto[]>(`${this.ruta}/producto/traer-productos`);
  }

  getEstudiantesPrograma = (id_programa: number): Observable<Producto[]> => {
    return this.http.get<Producto[]>(`${this.ruta}/estudiante/traer-estudiantes/${id_programa}`);
  }

  updateProducto = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/producto/update-producto`, data);
  }
  
  deleteProducto = (id_producto: number): Observable<any> => {
    return this.http.delete<any>(`${this.ruta}/producto/delete-producto/${id_producto}`);
  }
}
