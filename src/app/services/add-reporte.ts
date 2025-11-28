import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private apiUrl = 'http://localhost/up-tickets-back/add-reporte.php';

  constructor(private http: HttpClient) {}

  addReporte(reporte: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token || '',
    });

    return this.http.post<any>(this.apiUrl, reporte, { headers });
  }

  getReportes(profesorId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Auth-Token': token || '',
    });

    return this.http.get<any>('http://localhost/up-tickets-back/get-reportes.php', {
      headers,
      params: { id: profesorId },
    });
  }
}
