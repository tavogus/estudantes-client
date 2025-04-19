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
  private readonly API_URL = `${environment.apiUrl}/alunos`;
  private readonly CACHE_KEY = 'alunos';

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
    if (this.cacheService.has(this.CACHE_KEY)) {
      return this.cacheService.getArray<AlunoDTO>(this.CACHE_KEY);
    }

    this.log('Buscando lista de alunos');
    return this.http.get<AlunoDTO[]>(this.API_URL)
      .pipe(
        tap(data => {
          this.log('Lista de alunos obtida com sucesso');
          this.cacheService.set(this.CACHE_KEY, data);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  buscarPorId(id: number): Observable<AlunoDTO> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    
    if (this.cacheService.has(cacheKey)) {
      this.log('Retornando dados do cache');
      return this.cacheService.getWithDefault<AlunoDTO>(cacheKey, {} as AlunoDTO);
    }

    this.log(`Buscando aluno com ID: ${id}`);
    return this.http.get<AlunoDTO>(`${this.API_URL}/${id}`)
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
    return this.http.post<AlunoDTO>(this.API_URL, aluno)
      .pipe(
        tap(() => {
          this.log('Aluno criado com sucesso');
          this.cacheService.remove(this.CACHE_KEY);
        }),
        catchError(this.handleError)
      );
  }

  atualizar(id: number, aluno: AlunoDTO): Observable<AlunoDTO> {
    this.log(`Atualizando aluno com ID: ${id}`);
    return this.http.put<AlunoDTO>(`${this.API_URL}/${id}`, aluno)
      .pipe(
        tap(() => {
          this.log(`Aluno ${id} atualizado com sucesso`);
          this.cacheService.remove(this.CACHE_KEY);
          this.cacheService.remove(`${this.CACHE_KEY}_${id}`);
        }),
        catchError(this.handleError)
      );
  }

  excluir(id: number): Observable<void> {
    this.log(`Excluindo aluno com ID: ${id}`);
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => {
          this.log(`Aluno ${id} excluído com sucesso`);
          this.cacheService.remove(this.CACHE_KEY);
          this.cacheService.remove(`${this.CACHE_KEY}_${id}`);
        }),
        catchError(this.handleError)
      );
  }

  listarPorEscola(escolaId: number, filters: any = {}): Observable<AlunoDTO[]> {
    const cacheKey = `${this.CACHE_KEY}_escola_${escolaId}_${JSON.stringify(filters)}`;
    
    if (this.cacheService.has(cacheKey)) {
      this.log('Retornando dados do cache');
      return this.cacheService.getArray<AlunoDTO>(cacheKey);
    }

    this.log(`Buscando alunos da escola ${escolaId} com filtros`);
    return this.http.get<AlunoDTO[]>(`${this.API_URL}/escola/${escolaId}`, { params: filters })
      .pipe(
        tap(data => {
          this.log(`Alunos da escola ${escolaId} obtidos com sucesso`);
          this.cacheService.set(cacheKey, data);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  buscarPorEscola(escolaId: number): Observable<AlunoDTO[]> {
    const cacheKey = `${this.CACHE_KEY}_escola_${escolaId}`;
    
    if (this.cacheService.has(cacheKey)) {
      return this.cacheService.getArray<AlunoDTO>(cacheKey);
    }

    this.log(`Buscando alunos da escola ${escolaId}`);
    return this.http.get<AlunoDTO[]>(`${this.API_URL}/escola/${escolaId}`).pipe(
      tap(data => {
        this.log(`Alunos da escola ${escolaId} obtidos com sucesso`);
        this.cacheService.set(cacheKey, data);
      }),
      retry(3),
      catchError(this.handleError)
    );
  }
}
