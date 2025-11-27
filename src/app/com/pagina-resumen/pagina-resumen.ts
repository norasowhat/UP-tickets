import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenavbar } from '../sidenavbar/sidenavbar';

@Component({
  selector: 'app-pagina-resumen',
  standalone: true,
  imports: [CommonModule, Sidenavbar],
  templateUrl: './pagina-resumen.html',
  styleUrl: './pagina-resumen.css',
})
export class PaginaResumen {
  botonActivo: number = -1;

  seleccionarBoton(index: number) {
    this.botonActivo = index;
  }
}
