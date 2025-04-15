import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, switchMap } from 'rxjs/operators';
import { AlunoDTO } from '../models/aluno-dto';
import { environment } from '../../../environments/environment';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = `${environment.apiUrl}/alunos`;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

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
    console.log(`AlunoService: ${message}`);
  }

  private getCacheKey(method: string, params?: any): string {
    return `aluno_${method}_${JSON.stringify(params || '')}`;
  }

  listar(): Observable<AlunoDTO[]> {
    const cacheKey = this.getCacheKey('listar');
    const cachedData = this.cacheService.get<AlunoDTO[]>(cacheKey);
    
    if (cachedData) {
      this.log('Retornando dados do cache');
      return cachedData;
    }

    this.log('Buscando lista de alunos');
    return this.http.get<AlunoDTO[]>(this.apiUrl)
      .pipe(
        tap(data => {
          this.log('Lista de alunos obtida com sucesso');
          this.cacheService.set(cacheKey, data);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  buscarPorId(id: number): Observable<AlunoDTO> {
    const cacheKey = this.getCacheKey('buscarPorId', { id });
    const cachedData = this.cacheService.get<AlunoDTO>(cacheKey);
    
    if (cachedData) {
      this.log('Retornando dados do cache');
      return cachedData;
    }

    this.log(`Buscando aluno com ID: ${id}`);
    return this.http.get<AlunoDTO>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(data => {
          this.log(`Aluno ${id} obtido com sucesso`);
          this.cacheService.set(cacheKey, data);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  criar(aluno: AlunoDTO): Observable<AlunoDTO> {
    this.log('Criando novo aluno');
    return this.http.post<AlunoDTO>(this.apiUrl, aluno)
      .pipe(
        tap(data => {
          this.log('Aluno criado com sucesso');
          this.cacheService.clear(); // Limpa o cache após criar um novo aluno
        }),
        catchError(this.handleError)
      );
  }

  atualizar(id: number, aluno: AlunoDTO): Observable<AlunoDTO> {
    this.log(`Atualizando aluno com ID: ${id}`);
    return this.http.put<AlunoDTO>(`${this.apiUrl}/${id}`, aluno)
      .pipe(
        tap(data => {
          this.log(`Aluno ${id} atualizado com sucesso`);
          this.cacheService.clear(); // Limpa o cache após atualizar
        }),
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    this.log(`Excluindo aluno com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          this.log(`Aluno ${id} excluído com sucesso`);
          this.cacheService.clear(); // Limpa o cache após excluir
        }),
        catchError(this.handleError)
      );
  }

  listarPorEscola(escolaId: number, filters: any = {}): Observable<AlunoDTO[]> {
    const cacheKey = this.getCacheKey('listarPorEscola', { escolaId, ...filters });
    const cachedData = this.cacheService.get<AlunoDTO[]>(cacheKey);
    
    if (cachedData) {
      this.log('Retornando dados do cache');
      return cachedData;
    }

    this.log(`Buscando alunos da escola ${escolaId} com filtros`);
    return this.http.get<AlunoDTO[]>(`${this.apiUrl}/escola/${escolaId}`, { params: filters })
      .pipe(
        tap(data => {
          this.log(`Alunos da escola ${escolaId} obtidos com sucesso`);
          this.cacheService.set(cacheKey, data);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }
}
