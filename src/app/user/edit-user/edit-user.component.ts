import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  EMAIL_REGEX,
  isValidPersonForm,
  sanitizeDigits,
  sanitizeEmail,
} from 'src/app/common-factory';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class editUserComponent implements OnInit {
  editando = false;
  origen = 'user';
  userId = 0;
  dni = '';
  name = '';
  apellido = '';
  direccion = '';
  telefono = '';
  tel_fijo = '';
  email = '';
  password = '';
  emailPattern = EMAIL_REGEX.source;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.origen = this.activatedRoute.snapshot.queryParamMap.get('origen') || 'user';
    this.loadUserDetails();
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
    });
  }

  loadUserDetails() {
    this.userService.getUser(this.userId).subscribe(
      (user) => {
        this.dni = user.dni;
        this.name = user.name;
        this.apellido = user.apellido;
        this.direccion = user.direccion;
        this.telefono = user.telefono;
        this.tel_fijo = user.tel_fijo;
        this.email = user.email;
        this.password = user.password;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );
  }

  updateUser(form: NgForm) {
    if (form.invalid || !this.isFormDataValid()) {
      form.control.markAllAsTouched();
      return;
    }

    const updatedUser = {
      dni: this.dni,
      name: this.name,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: this.telefono,
      tel_fijo: this.tel_fijo,
      email: this.email,
      password: this.password
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.editando = false;
        if (this.origen === 'psicologo') {
          this.router.navigate(['/dashboard/psicologo']);
        } else if (this.origen === 'user') {
          this.router.navigate(['/dashboard/user']);
        } else if (this.origen === 'paciente') {
          this.router.navigate(['/dashboard/paciente']);
        }
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  goBack(): void {
    if (this.origen === 'psicologo') {
      this.router.navigate(['/dashboard/psicologo']);
    } else if (this.origen === 'user') {
      this.router.navigate(['/dashboard/user']);
    } else if (this.origen === 'paciente') {
      this.router.navigate(['/dashboard/paciente']);
    }
  }
}
