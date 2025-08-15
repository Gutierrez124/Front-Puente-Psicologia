import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-save-paciente',
  templateUrl: './save-paciente.component.html',
  styleUrls: ['./save-paciente.component.css']
})
export class SavePacienteComponent implements OnInit {
  dni: string = '';
  name: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  tel_fijo: string = '';
  email: string = '';
  password: string = '';
  type_user: string='3';

  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
  }

  createPaciente() {
    const newPaciente = { dni: this.dni, name: this.name, apellido: this.apellido, direccion: this.direccion, telefono: this.telefono, tel_fijo: this.tel_fijo, email: this.email, password: this.password, type_user: this.type_user};

    this.pacienteService.createPaciente(newPaciente).subscribe(
      (response) => {
        console.log('Paciente creado:', response);
        this.router.navigate(['/dashboard/paciente']); // Redirigir a la lista de usuarios después de crear
      },
      (error) => {
        console.error('Error al crear paciente:', error);
      }
    );
  }

}
