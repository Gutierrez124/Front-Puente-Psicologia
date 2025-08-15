import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../app/Auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from "../app/Auth/guards/role.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagWebComponent } from './pag-web/pag-web.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch:'full'},
  { path: '', component: PagWebComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'psicologo', 'paciente'] },
     children: [
      // {path: '', component:MainContentComponent},
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'psicologo', 'paciente'] }
      },
      {path: 'user', 
        loadChildren:() => import('./user/user.module').then(m=>m.UserModule),
        canActivate: [RoleGuard],
        data: {roles: ['admin','psicologo']}
      },
      {path: 'paciente', 
        loadChildren:() => import('./paciente/paciente.module').then(m=>m.PacienteModule),
        canActivate: [RoleGuard],
        data: {roles: ['admin','paciente']}
      },
      {path: 'psicologo', 
        loadChildren:() => import('./psicologo/psicologo.module').then(m=>m.PsicologoModule),
        canActivate: [RoleGuard],
        data: {roles: ['admin','psicologo']}
      },
      // {path:'cita',
      //   loadChildren:() => import('./cita/cita.module').then(m=>m.CitaModule),
      //   canActivate: [RoleGuard],
      //   data: {roles: ['admin',]}
      // }
    ],
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
