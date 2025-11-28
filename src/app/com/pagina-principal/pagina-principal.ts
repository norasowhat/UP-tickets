import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenavbar } from '../sidenavbar/sidenavbar';
import { AgregarProfesor } from '../agregar-profesor/agregar-profesor';
import { ProfesorService } from '../../services/tabla-profesores';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/add-reporte';
import { AcademyService } from '../../services/dp-academias';
import { noop } from 'rxjs';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule, Sidenavbar, AgregarProfesor, FormsModule],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css',
  providers: [ProfesorService],
})
export class PaginaPrincipal implements OnInit {
  profesores: any[] = [];
  loading: boolean = false;
  error: string = '';

  @Output() reporteAgregado = new EventEmitter<void>();


  constructor(private router: Router, 
    private profesorService: ProfesorService, 
    private reporteService: ReporteService, 
    private academyService: AcademyService ) {}

  busquedaProfesor = "";
  gradoInvestigador: string = "";
  incidencias:string = "";
  satisfaccion:string ="";
  academia:string = "";

  

  ProfesoresFiltrados : any[] = [];

  profesorSeleccionado : any = {};

  academias: any = [];
  profesor_reportes:any=[];

  reporte = {
    professor_id :'',
    category: '',
    description:''
    
  }

  ngOnInit(): void {
    this.loadProfesores();
    this.academyService.getAcademias().subscribe((data) => {
      this.academias = data;
    });  }
  
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
      next: (data: any) => {
        console.log('Datos recibidos del backend:', data);
        this.profesores = data;
        this.ProfesoresFiltrados = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar profesores:', err);
        this.error = 'No se pudieron cargar los profesores';
        this.loading = false;
      },
    });
  }

  buscarProfesor() {
    console.log(this.profesores);
    const termino = this.busquedaProfesor.toLowerCase();
    console.log(termino);
  
    this.ProfesoresFiltrados = this.profesores.filter(p =>
      p.Nombre.toLowerCase().includes(termino));
    }

    loadReportes(profesor:any){
      this.reporteService.getReportes(profesor.ID).subscribe({
        next:(data:any) =>{
          this.profesor_reportes = data;
        }
      })


    }


  abrirModal(profesor:any) {
    console.log('Abriendo modal...');
    const modalElement = document.getElementById('miModal');
    this.profesorSeleccionado = profesor;
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
      console.log(profesor.ID);
      this.reporte.professor_id = profesor.ID;

      this.loadReportes(profesor);

    }
  }


  agregarReporte(){
    this.reporteService.addReporte(this.reporte).subscribe({
      next: (resp:any) => {
        console.log("Respuesta del servidor:", resp);
        alert("Respuesta agregado correctamente");
        if(this.profesorSeleccionado){
          this.profesorSeleccionado.Numero_de_incidencias =  parseInt(this.profesorSeleccionado.Numero_de_incidencias) +1;
        }
        this.reporteAgregado.emit();

      },
      error: (err:any) => {
        console.error("Error en el servidor:", err);
        alert("Error al guardar reporte");
      }

    });

  }

  filtarProfesores(){
    this.ProfesoresFiltrados = this.profesores.filter(prof =>{

      const MismoGrado = this.gradoInvestigador === "" ||
      prof.Nivel_de_estudios === this.gradoInvestigador;

      console.log(this.incidencias)
      let MismasIncidencias = null;
      if(this.incidencias === ""){
        MismasIncidencias = true;
      }else if(this.incidencias === "+5"){
        MismasIncidencias =Number(prof.Numero_de_incidencias) > 5
      }else{
        MismasIncidencias = Number(this.incidencias) === Number(prof.Numero_de_incidencias);
      }


      const valor = Number(prof.Satisfaccion_academica);
      console.log(valor);
      let MismaSatisfaccion = null;
      switch(this.satisfaccion){
        case "":
          MismaSatisfaccion = true;
          break;
        case "0-20":
          MismaSatisfaccion = (valor >= 0 && valor <= 20);
          break;

        case "20-40":
          MismaSatisfaccion = (valor > 20 && valor <= 40);
          break;

        case "40-60":
          MismaSatisfaccion = (valor > 40 && valor <= 60);
          break;

        case "60-80":
          MismaSatisfaccion = (valor > 60 && valor <= 80);
          break;

        case "80-100":
          MismaSatisfaccion = (valor > 80 && valor <= 100);
          break;
      }


      console.log(prof.Academia);
      console.log(`La academia${this.academia}`)
      const MismaAcademia = this.academia === "" ||
      prof.Academia === this.academia;

      return MismaAcademia && MismoGrado && MismasIncidencias && MismaSatisfaccion;



    }

    )
  }
}
