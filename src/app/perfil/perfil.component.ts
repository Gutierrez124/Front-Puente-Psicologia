import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfil: any = {};

  constructor(private perfilService: PerfilService) { }

  ngOnInit() {
    this.perfilService.getPerfil().subscribe((data) => {
      this.perfil = data;
    });
  }

  guardarCambios() {
    this.perfilService.updatePerfil(this.perfil).subscribe({
      next: (res) => alert('Perfil actualizado con éxito'),
      error: (err) => alert('Error al actualizar el perfil')
    });
  }

}
