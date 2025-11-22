import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenavbar } from '../sidenavbar/sidenavbar';
import { AgregarProfesor } from '../agregar-profesor/agregar-profesor';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule, Sidenavbar, AgregarProfesor],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css',
})
export class PaginaPrincipal {
  constructor(private router: Router) {}
}
