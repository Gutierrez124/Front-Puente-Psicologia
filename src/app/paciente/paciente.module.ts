import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavePacienteComponent } from './save-paciente/save-paciente.component';
import { PacienteComponent } from './paciente.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { Routes, RouterModule } from '@angular/router';

const pacienteRoutes: Routes = [
  { path: '', component: PacienteComponent }
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    RouterModule.forChild(pacienteRoutes),
  ]
})
export class PacienteModule { }
