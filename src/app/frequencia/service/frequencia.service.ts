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
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private log(message: string) {
    console.log(`FrequenciaService: ${message}`);
  }

  buscarFrequenciasPorPeriodo(alunoId: number, dataInicio: string, dataFim: string): Observable<FrequenciaDTO[]> {
    this.log(`Buscando frequências do aluno ${alunoId} no período ${dataInicio} a ${dataFim}`);
    return this.http.get<FrequenciaDTO[]>(`${this.apiUrl}/aluno/${alunoId}/periodo`, {
      params: {
        dataInicio,
        dataFim
      }
    })
    .pipe(
      tap(() => this.log('Frequências obtidas com sucesso')),
      retry(3),
      catchError(this.handleError)
    );
  }
} 