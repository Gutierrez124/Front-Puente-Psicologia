import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/perfil';

  constructor(private http: HttpClient) { }
  // Obtener perfil actual
  getPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar perfil
  updatePerfil(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Cabeceras con token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o de donde guardes tu token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
