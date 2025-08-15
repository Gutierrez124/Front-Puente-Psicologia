import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
  private apiUrl = 'http://localhost:3000/users/create/psicologo';

  constructor(private http: HttpClient) { }
  // Crear un usuario
    createPsicologo(user: any): Observable<any> {
      return this.http.post(this.apiUrl, user);
    }
}
