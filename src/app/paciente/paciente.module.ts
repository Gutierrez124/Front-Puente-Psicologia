import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavePacienteComponent } from './save-paciente/save-paciente.component';
import { PacienteComponent } from './paciente.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Routes, RouterModule } from '@angular/router';

const pacienteRoutes: Routes = [
  { path: '', component: PacienteComponent },
  { path: 'save', component: SavePacienteComponent }
];

@NgModule({
  declarations: [
    SavePacienteComponent,
    PacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule.forChild(pacienteRoutes),
  ]
})
export class PacienteModule { }
