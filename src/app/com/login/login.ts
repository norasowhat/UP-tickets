import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule]
})
export class Login {
  email: string = '';
  password: string = '';
  constructor(private router: Router, private authService: Auth) {}

  iniciarSesion() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("TOKEN RECIBIDO:", response.token);
        localStorage.setItem("token", response.token);
        this.router.navigate(['/pagina-principal']);

      },
      error: (err) => {
        console.error("Error al iniciar sesión:", err);
      }
    });
  }
}
