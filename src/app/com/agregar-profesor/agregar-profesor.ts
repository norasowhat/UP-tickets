import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AcademyService } from '../../services/dp-academias';

@Component({
  selector: 'app-agregar-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './agregar-profesor.html',
  styleUrl: './agregar-profesor.css',
})

export class AgregarProfesor implements OnInit {

  @Output() profesorAgregado = new EventEmitter<void>();

  academias: any[] = [];

  profesor = {
    ID:'',
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo: '',
    password: 'password1234',
    telefono: '',
    id_academia: '',
    hiring_date:''
  };

  constructor(private academyService: AcademyService) {}

  ngOnInit(): void {
    this.getAcademias();
  }

  getAcademias() {
    this.academyService.getAcademias().subscribe({       
      next: (resp) => {
        this.academias = resp;
        console.log("Academias cargadas:", this.academias);
      },
      error: (err) => {
        console.error("Error cargando academias", err);
      }
    });
  }


  enviarFormulario() {
    console.log("Datos enviados:", this.profesor);

    this.academyService.agregarProfesor(this.profesor).subscribe({   
      next: (resp:any) => {
        console.log("Respuesta del servidor:", resp);
        alert("Profesor agregado correctamente");
        this.profesorAgregado.emit();
      },
      error: (err:any) => {
        console.error("Error en el servidor:", err);
        alert("Error al guardar el profesor");
      }
    });
  }
}