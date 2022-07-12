import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  ruta = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  saveMarca = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/marca/save-marca`, data);
  }

  getMarca = (id_marca: number): Observable<Marca> => {
    return this.http.get<Marca>(`${this.ruta}/marca/traer-marca/${id_marca}`);
  }

  getMarcas = (): Observable<Marca[]> => {
    return this.http.get<Marca[]>(`${this.ruta}/marca/traer-marcas`);
  }

  getEstudiantesPrograma = (id_programa: number): Observable<Marca[]> => {
    return this.http.get<Marca[]>(`${this.ruta}/estudiante/traer-estudiantes/${id_programa}`);
  }

  updateMarca = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/marca/update-marca`, data);
  }
  
  deleteMarca = (id_marca: number): Observable<any> => {
    return this.http.delete<any>(`${this.ruta}/marca/delete-marca/${id_marca}`);
  }
}
