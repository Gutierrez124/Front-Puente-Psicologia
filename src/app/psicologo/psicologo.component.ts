import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.component.html',
  styleUrls: ['./psicologo.component.css']
})
export class PsicologoComponent implements OnInit {
 displayedColumns: string[] = ['id', 'dni', 'name', 'apellido', 'direccion', 'telefono', 'tel_fijo', 'email', 'acciones'];
  dataSource = new MatTableDataSource<any>(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadPsicologos();
    
  }

  loadPsicologos(): void {
    this.userService.getUserByType(3).subscribe(
      (data) => {
        this.dataSource = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching psicologos:', error);
      }
    );
  }

  editarUsuario(id: number, origen: string) {
  this.router.navigate(
    ['/dashboard/user/edit', id],
    { queryParams: { origen } }
  );
}


  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  createPsicologo() {
    this.router.navigate(['/dashboard/psicologo/create']);
  }

deletePsicologo(id: number) {
  this.userService.deleteUser(id).subscribe(() => {
    this.loadPsicologos();
  });
}



}
