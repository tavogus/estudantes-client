import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EscolaDTO } from '../models/escola-dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class EscolaService {
  private apiUrl = `${environment.apiUrl}/escolas`;

  constructor(private http: HttpClient) { }

  listar(): Observable<EscolaDTO[]> {
    return this.http.get<EscolaDTO[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<EscolaDTO> {
    return this.http.get<EscolaDTO>(`${this.apiUrl}/${id}`);
  }

  criar(escola: EscolaDTO): Observable<EscolaDTO> {
    return this.http.post<EscolaDTO>(this.apiUrl, escola);
  }

  atualizar(id: number, escola: EscolaDTO): Observable<EscolaDTO> {
    return this.http.put<EscolaDTO>(`${this.apiUrl}/${id}`, escola);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
