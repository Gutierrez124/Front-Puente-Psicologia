import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  createPersonForm,
  EMAIL_REGEX,
  isValidPersonForm,
  PersonFormModel,
  sanitizeDigits,
  sanitizeEmail,
} from '../common-factory';
import { PacienteService } from '../services/paciente.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'dni',
    'name',
    'apellido',
    'direccion',
    'telefono',
    'tel_fijo',
    'email',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  createModalOpen = false;
  form: PersonFormModel = createPersonForm('2');
  emailPattern = EMAIL_REGEX.source;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes() {
    this.userService.getUserByType(2).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

  openCreateModal() {
    this.form = createPersonForm('2');
    this.createModalOpen = true;
  }

  closeCreateModal(form?: NgForm) {
    this.createModalOpen = false;
    this.form = createPersonForm('2');
    form?.resetForm(this.form);
  }

  sanitizeDni(value: string) {
    this.form.dni = sanitizeDigits(value, 8);
  }

  sanitizeTelefono(value: string) {
    this.form.telefono = sanitizeDigits(value, 9);
  }

  sanitizeTelefonoFijo(value: string) {
    this.form.tel_fijo = sanitizeDigits(value, 7);
  }

  sanitizeCorreo(value: string) {
    this.form.email = sanitizeEmail(value);
  }

  isCreateFormValid(): boolean {
    return isValidPersonForm(this.form);
  }

  submitCreate(formDirective: NgForm) {
    if (formDirective.invalid || !this.isCreateFormValid()) {
      formDirective.control.markAllAsTouched();
      return;
    }

    this.pacienteService.createPaciente(this.form).subscribe(
      () => {
        this.loadPacientes();
        this.closeCreateModal(formDirective);
      },
      (error) => {
        console.error('Error al crear paciente:', error);
      }
    );
  }

  editarUsuario(id: number, origen: string) {
    this.router.navigate(['/dashboard/user/edit', id], {
      queryParams: { origen },
    });
  }

  deletePaciente(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadPacientes();
    });
  }
}
