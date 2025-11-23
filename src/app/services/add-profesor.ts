import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8888/web/up-tickets-back/add-profesor.php';

  constructor(private http: HttpClient) {}

  addProfesor(profesor:any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': token || ''
    });

    return this.http.post<any>(this.apiUrl, profesor, { headers });
  }};