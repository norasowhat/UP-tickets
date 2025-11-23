import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8888/web/up-tickets-back/table-profesores.php';

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Auth-Token': token || ''
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }}
