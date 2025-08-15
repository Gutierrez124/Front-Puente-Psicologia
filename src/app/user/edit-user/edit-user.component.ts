import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class editUserComponent implements OnInit {

  editando: boolean = false;
  origen: string = 'user';
  userId: number = 0;
  dni: string = '';
  name: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  tel_fijo: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,  // Servicio para manejar usuarios
    private activatedRoute: ActivatedRoute,  // Para obtener parámetros de la URL
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.origen = this.activatedRoute.snapshot.queryParamMap.get('origen') || 'user';
    // Llamar a la función para cargar los datos del usuario
    this.loadUserDetails();
  }

  // Función para cargar los datos del usuario
  loadUserDetails() {
    this.userService.getUser(this.userId).subscribe(
      (user) => {
        // Asignar los datos del usuario a las propiedades del componente
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


  updateUser() {
    const updatedUser = { dni: this.dni, name: this.name, apellido: this.apellido, direccion: this.direccion, telefono: this.telefono, tel_fijo: this.tel_fijo, email: this.email, password: this.password };

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
