import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { FrequenciaDTO } from '../models/frequencia-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  private apiUrl = `${environment.apiUrl}/frequencias`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro na requisição';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private log(message: string) {
    console.log(`FrequenciaService: ${message}`);
  }

  criar(frequencia: FrequenciaDTO): Observable<FrequenciaDTO> {
    this.log('Criando nova frequência');
    return this.http.post<FrequenciaDTO>(this.apiUrl, frequencia)
      .pipe(
        tap(() => this.log('Frequência criada com sucesso')),
        catchError(this.handleError)
      );
  }

  listarPorAluno(alunoId: number): Observable<FrequenciaDTO[]> {
    this.log(`Buscando frequências do aluno ${alunoId}`);
    return this.http.get<FrequenciaDTO[]>(`${this.apiUrl}/aluno/${alunoId}`)
      .pipe(
        tap(() => this.log(`Frequências do aluno ${alunoId} obtidas com sucesso`)),
        retry(3),
        catchError(this.handleError)
      );
  }
} 