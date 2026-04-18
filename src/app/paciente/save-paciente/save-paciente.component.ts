import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import {
  EMAIL_REGEX,
  isValidPersonForm,
  sanitizeDigits,
  sanitizeEmail,
} from 'src/app/common-factory';

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
  type_user: string = '3';
  emailPattern = EMAIL_REGEX.source;

  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
  }

  sanitizeDni(value: string) {
    this.dni = sanitizeDigits(value, 8);
  }

  sanitizeTelefono(value: string) {
    this.telefono = sanitizeDigits(value, 9);
  }

  sanitizeTelefonoFijo(value: string) {
    this.tel_fijo = sanitizeDigits(value, 7);
  }

  sanitizeCorreo(value: string) {
    this.email = sanitizeEmail(value);
  }

  isFormDataValid(): boolean {
    return isValidPersonForm({
      dni: this.dni,
      name: this.name,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: this.telefono,
      tel_fijo: this.tel_fijo,
      email: this.email,
      password: this.password,
      type_user: this.type_user,
    });
  }

  createPaciente(form: NgForm) {
    if (form.invalid || !this.isFormDataValid()) {
      form.control.markAllAsTouched();
      return;
    }

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
