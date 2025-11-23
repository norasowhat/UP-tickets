import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenavbar } from '../sidenavbar/sidenavbar';
import { AgregarProfesor } from '../agregar-profesor/agregar-profesor';
import { ProfesorService } from '../../services/tabla-profesores';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule, Sidenavbar, AgregarProfesor],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css',
  providers: [ProfesorService]
})
export class PaginaPrincipal implements OnInit {
  profesores: any[] = [];
  loading: boolean = false;
  error: string = '';
  
  constructor(private router: Router,private profesorService: ProfesorService) {}

  ngOnInit(): void {
    this.loadProfesores();
  }

  loadProfesores(): void {
    // this.profesorService.getProfesores().subscribe({
    //   next: (res) => {
    //     console.log("Respuesta del backend:", res);
    //   },
    //   error: (err) => {
    //     console.error("Error al cargar profesores:", err);
    //   }
    // });
  


    this.loading = true;
    this.profesorService.getProfesores().subscribe({
      next: (data:any) => {
        console.log('Datos recibidos del backend:', data);
        this.profesores = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar profesores:', err);
        this.error = 'No se pudieron cargar los profesores';
        this.loading = false;
      }
    });
  }
}
