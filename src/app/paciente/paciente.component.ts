import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private router: Router) {}

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

  editarUsuario(id: number, origen: string) {
    this.router.navigate(['/dashboard/user/edit', id], {
      queryParams: { origen },
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  createPaciente() {
    this.router.navigate(['/dashboard/paciente/save']);
  }

  deletePaciente(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadPacientes();
    });
  }
}
