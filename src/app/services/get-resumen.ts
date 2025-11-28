import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumenService {
  private apiUrl = 'http://localhost/up-tickets-back/resumen-service.php';

  constructor(private http: HttpClient) {}

  getResumen(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Auth-Token': token || '',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
