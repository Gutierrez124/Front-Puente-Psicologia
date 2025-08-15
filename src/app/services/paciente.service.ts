import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:3000/users/create/paciente';

  constructor(private http: HttpClient) { }

  createPaciente(paciente: any) {
    return this.http.post(this.apiUrl, paciente);
  }
}
