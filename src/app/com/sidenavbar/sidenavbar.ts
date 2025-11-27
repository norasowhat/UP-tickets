import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavbar.html',
  styleUrl: './sidenavbar.css',
})
export class Sidenavbar {
  constructor(private router: Router) {}
  cerrarSesion() {
    this.router.navigate(['/login']);
  }
  irProfes() {
    this.router.navigate(['/pagina-principal']);
  }
  irResumen() {
    this.router.navigate(['/pagina-resumen']);
  }
}
