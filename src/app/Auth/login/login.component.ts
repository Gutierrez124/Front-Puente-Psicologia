import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email = '';
  public password = '';
public errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  // login.component.ts - ngOnInit
public ngOnInit() {
  this.authService.logout(false); // flag opcional para no navegar
}

 public onLogin(){  
  this.errorMessage = ''; // Limpiar mensaje de error antes de intentar iniciar sesión
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const user = response.user;
        // console.log('Usuario logueado:', user); // Ver los datos del usuario
        console.log('Usuario logueado:', user);
        console.log('Tipo de dato de role:', typeof user.role);
        console.log('Contenido exacto de role:', JSON.stringify(user.role));

        const role = (user.role || '').toString().trim().toLowerCase();
        console.log('Rol procesado:', role);

        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'psicologo') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'paciente') {
          this.router.navigate(['/dashboard']);
        } else {
          console.warn('Rol no reconocido');
        }

      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        // Aquí puedes agregar el manejo de errores si es necesario
      }
    );
  }

}
