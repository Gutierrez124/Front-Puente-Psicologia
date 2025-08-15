import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsicologoService } from 'src/app/services/psicologo.service';

@Component({
  selector: 'app-create-psicologo',
  templateUrl: './create-psicologo.component.html',
  styleUrls: ['./create-psicologo.component.css']
})
export class CreatePsicologoComponent implements OnInit {

   dni: string = '';
  name: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  tel_fijo: string = '';
  email: string = '';
  password: string = '';
  type_user: string='3';

  constructor(private PsicologoService: PsicologoService, private router: Router) { }

  createPsicologo() {
    const newPsicologo = { dni: this.dni, name: this.name, apellido: this.apellido, direccion: this.direccion, telefono: this.telefono, tel_fijo: this.tel_fijo, email: this.email, password: this.password, type_user: this.type_user};
    
    this.PsicologoService.createPsicologo(newPsicologo).subscribe(
      (response) => {
        console.log('Psicologo creado:', response);
        this.router.navigate(['/dashboard/psicologo']); // Redirigir a la lista de psicologos después de crear
      },
      (error) => {
        console.error('Error al crear psicologo:', error);
      }
    );
  }
  ngOnInit(): void {
  }

}
