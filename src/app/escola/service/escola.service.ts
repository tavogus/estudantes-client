import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { EscolaDTO } from '../models/escola-dto';
import { environment } from '../../../environments/environment';

interface EscolaFilters {
  nome?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  private apiUrl = `${environment.apiUrl}/escolas`;

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
    console.log(`EscolaService: ${message}`);
  }

  listar(filters: EscolaFilters = {}): Observable<EscolaDTO[]> {
    this.log('Buscando lista de escolas');
    const params = this.buildQueryParams(filters);
    return this.http.get<EscolaDTO[]>(`${this.apiUrl}${params}`)
      .pipe(
        tap(() => this.log('Lista de escolas obtida com sucesso')),
        retry(3),
        catchError(this.handleError)
      );
  }

  private buildQueryParams(filters: EscolaFilters): string {
    const params = new URLSearchParams();
    
    if (filters.nome) {
      params.append('nome', filters.nome);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  buscarPorId(id: number): Observable<EscolaDTO> {
    this.log(`Buscando escola com ID: ${id}`);
    return this.http.get<EscolaDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.log(`Escola ${id} obtida com sucesso`)),
        retry(3),
        catchError(this.handleError)
      );
  }

  criar(escola: EscolaDTO): Observable<EscolaDTO> {
    this.log('Criando nova escola');
    return this.http.post<EscolaDTO>(this.apiUrl, escola)
      .pipe(
        tap(() => this.log('Escola criada com sucesso')),
        catchError(this.handleError)
      );
  }

  atualizar(id: number, escola: EscolaDTO): Observable<EscolaDTO> {
    this.log(`Atualizando escola com ID: ${id}`);
    return this.http.put<EscolaDTO>(`${this.apiUrl}/${id}`, escola)
      .pipe(
        tap(() => this.log(`Escola ${id} atualizada com sucesso`)),
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    this.log(`Excluindo escola com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.log(`Escola ${id} excluída com sucesso`)),
        catchError(this.handleError)
      );
  }
}
