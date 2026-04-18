import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PerfilService } from '../services/perfil.service';
import {
  EMAIL_REGEX,
  isValidPersonForm,
  sanitizeDigits,
  sanitizeEmail,
} from '../common-factory';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfil: any = {};
  emailPattern = EMAIL_REGEX.source;

  constructor(private perfilService: PerfilService) { }

  ngOnInit() {
    this.perfilService.getPerfil().subscribe((data) => {
      this.perfil = data;
    });
  }

  sanitizeDni(value: string) {
    this.perfil.dni = sanitizeDigits(value, 8);
  }

  sanitizeTelefono(value: string) {
    this.perfil.telefono = sanitizeDigits(value, 9);
  }

  sanitizeTelefonoFijo(value: string) {
    this.perfil.tel_fijo = sanitizeDigits(value, 7);
  }

  sanitizeCorreo(value: string) {
    this.perfil.email = sanitizeEmail(value);
  }

  isFormDataValid(): boolean {
    return isValidPersonForm(
      {
        dni: this.perfil.dni ?? '',
        name: this.perfil.name ?? '',
        apellido: this.perfil.apellido ?? '',
        direccion: this.perfil.direccion ?? '',
        telefono: this.perfil.telefono ?? '',
        tel_fijo: this.perfil.tel_fijo ?? '',
        email: this.perfil.email ?? '',
        password: this.perfil.password ?? '',
      },
      false
    );
  }

  guardarCambios(form: NgForm) {
    if (form.invalid || !this.isFormDataValid()) {
      form.control.markAllAsTouched();
      return;
    }

    this.perfilService.updatePerfil(this.perfil).subscribe({
      next: () => alert('Perfil actualizado con exito'),
      error: () => alert('Error al actualizar el perfil')
    });
  }
}
