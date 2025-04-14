import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlunoDTO } from '../models/aluno-dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class AlunoService {
  private apiUrl = `${environment.apiUrl}/alunos`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<AlunoDTO[]> {
    return this.http.get<AlunoDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<AlunoDTO> {
    return this.http.get<AlunoDTO>(`${this.apiUrl}/${id}`);
  }

  create(aluno: AlunoDTO): Observable<AlunoDTO> {
    return this.http.post<AlunoDTO>(this.apiUrl, aluno);
  }

  update(id: number, aluno: AlunoDTO): Observable<AlunoDTO> {
    return this.http.put<AlunoDTO>(`${this.apiUrl}/${id}`, aluno);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
