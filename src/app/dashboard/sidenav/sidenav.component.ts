import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, Input} from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import * as $ from 'jquery';
import 'metismenu';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit {
 @Input() isCollapsed: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();
  public isHovered: boolean = false;
  public userRole: string = '';
  public menuState: { [key: string]: boolean } = {};

  constructor(public cdr: ChangeDetectorRef, public sidenavService: SidenavService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || '';
    console.log('Rol del usuario en SideNav:', this.userRole);
  }

  ngAfterViewInit(): void {
  ($('#menu') as any).metisMenu();
  this.cdr.detectChanges();
}

  isAdmin() {
    return this.userRole.toLocaleLowerCase() === 'admin';
  }

  isPsicologo() {
    return this.userRole.toLocaleLowerCase() === 'psicologo';
  }

  isPaciente() {
    return this.userRole.toLocaleLowerCase() === 'paciente';
  }

  toggleSidebar() {
  const newState = this.sidenavService.toggle();
  this.toggle.emit(newState); // ← aquí se emite el nuevo estado al padre
}
toggleSection(section: string) {
  // Cierra todos los menús excepto el actual
  for (let key in this.menuState) {
    if (key !== section) {
      this.menuState[key] = false;
    }
  }

  // Alterna el actual
  this.menuState[section] = !this.menuState[section];
}


isSectionExpanded(section: string): boolean {
  return !!this.menuState[section];
}

cerrarSesion() {
  this.authService.logout();
}


}
