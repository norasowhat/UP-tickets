import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademyService {
  private apiUrl = 'http://localhost/up-tickets-back/dp-academias.php';

  constructor(private http: HttpClient) {}

  getAcademias(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Auth-Token': token || '',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  agregarProfesor(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Auth-Token': token || '',
    });

    return this.http.post<any>('http://localhost/up-tickets-back/add-profesor.php', data, {
      headers,
    });
  }
}
