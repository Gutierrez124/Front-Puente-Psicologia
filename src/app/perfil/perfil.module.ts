import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    RouterModule.forChild(perfilRoutes)
  ]
})
export class PerfilModule { }
