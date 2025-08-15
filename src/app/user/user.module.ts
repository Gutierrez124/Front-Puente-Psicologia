import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { editUserComponent } from './edit-user/edit-user.component';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';;

const userRoutes: Routes = [
  { path: '', component: UserComponent },
  { path: 'edit/:id', component: editUserComponent }
];

@NgModule({
  declarations: [
    UserComponent,
    editUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule.forChild(userRoutes),
  ]
})
export class UserModule { }
