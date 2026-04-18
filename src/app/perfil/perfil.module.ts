import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PerfilComponent } from './perfil.component';
import { RouterModule, Routes } from '@angular/router';;

const perfilRoutes: Routes = [
  { path: '', component: PerfilComponent }
];

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(perfilRoutes)
  ]
})
export class PerfilModule { }
