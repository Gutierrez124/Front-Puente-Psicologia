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
import { PsicologoService } from '../services/psicologo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.component.html',
  styleUrls: ['./psicologo.component.css']
})
export class PsicologoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dni', 'name', 'apellido', 'direccion', 'telefono', 'tel_fijo', 'email', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  createModalOpen = false;
  form: PersonFormModel = createPersonForm('3');
  emailPattern = EMAIL_REGEX.source;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private psicologoService: PsicologoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPsicologos();
  }

  loadPsicologos(): void {
    this.userService.getUserByType(3).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching psicologos:', error);
      }
    );
  }

  openCreateModal() {
    this.form = createPersonForm('3');
    this.createModalOpen = true;
  }

  closeCreateModal(form?: NgForm) {
    this.createModalOpen = false;
    this.form = createPersonForm('3');
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

    this.psicologoService.createPsicologo(this.form).subscribe(
      () => {
        this.loadPsicologos();
        this.closeCreateModal(formDirective);
      },
      (error) => {
        console.error('Error al crear psicologo:', error);
      }
    );
  }

  editarUsuario(id: number, origen: string) {
    this.router.navigate(
      ['/dashboard/user/edit', id],
      { queryParams: { origen } }
    );
  }

  deletePsicologo(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadPsicologos();
    });
  }
}
