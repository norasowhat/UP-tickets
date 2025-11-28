import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidenavbar } from '../sidenavbar/sidenavbar';
import { ResumenService } from '../../services/get-resumen';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pagina-resumen',
  standalone: true,
  imports: [CommonModule, Sidenavbar],
  templateUrl: './pagina-resumen.html',
  styleUrl: './pagina-resumen.css',
})
export class PaginaResumen {
  botonesActivos: number[] = [];

  resumen :any[]=[];

  encabezados = [
    'Nombre',
    'ID',
    'Academia',
    'Nivel máximo de estudios',
    'Nivel SNI',
    'Facultad',
    'No. incidencias',
    'Clases Actuales',
    'Clases Pasadas',
    'Idiomas que habla'
  ];

  ngOnInit(): void {
    this.loadResumen();
    };  

  encabezadosSeleccionados: string[] = [];


  constructor(private resumenService : ResumenService){}

  seleccionarBoton(index: number) {
    const encabezado = this.encabezados[index];
    if (!this.botonesActivos.includes(index)) {
      this.botonesActivos.push(index);
      this.encabezadosSeleccionados.push(encabezado);

    }
    else{
      let i = this.botonesActivos.indexOf(index)
      let e = this.encabezadosSeleccionados.indexOf(encabezado)
      this.botonesActivos.splice(i,1);
      this.encabezadosSeleccionados.splice(e,1);
    }

  }

  loadResumen():void{
    this.resumenService.getResumen().subscribe({
      next:(data:any) =>{
        console.log('Resumen recibido',data)
        this.resumen=data;


      },
      error: (err: any) => {
        console.error('Error al cargar profesores:', err);
      },
  });
}

  exportarExcel(){
    const data = this.resumen.map(item => {
      const fila: any = {};
      this.encabezadosSeleccionados.forEach(h => {
        fila[h] = item[h] || 'Ninguno';
      });
      return fila;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resumen');

    XLSX.writeFile(workbook, 'resumen_profesores.xlsx');
  }
}
