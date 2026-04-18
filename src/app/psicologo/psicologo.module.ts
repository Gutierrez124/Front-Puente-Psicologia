import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePsicologoComponent } from './create-psicologo/create-psicologo.component';
import { FormsModule } from '@angular/forms';
import { PsicologoComponent } from './psicologo.component';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  { path: '', component: PsicologoComponent },
];

@NgModule({
  declarations: [
    CreatePsicologoComponent,
    PsicologoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    RouterModule.forChild(routes),
  ]
})
export class PsicologoModule { }
