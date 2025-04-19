import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutos em milissegundos

  /**
   * Armazena um item no cache
   * @param key Chave do item
   * @param data Dados a serem armazenados
   * @param ttl Tempo de vida em milissegundos
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl
    });
  }

  /**
   * Obtém um item do cache
   * @param key Chave do item
   * @returns Observable com os dados armazenados ou null se expirado/não existir
   */
  get<T>(key: string): Observable<T | null> {
    const item = this.cache.get(key);
    if (!item) return of(null);

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return of(null);
    }

    return of(item.data as T);
  }

  /**
   * Obtém um item do cache garantindo que não seja null
   * @param key Chave do item
   * @returns Observable com os dados armazenados ou um array vazio se expirado/não existir
   */
  getArray<T>(key: string): Observable<T[]> {
    return this.get<T[]>(key).pipe(
      map(data => data || [])
    );
  }

  /**
   * Obtém um item do cache garantindo que não seja null
   * @param key Chave do item
   * @param defaultValue Valor padrão caso o item não exista
   * @returns Observable com os dados armazenados ou o valor padrão se expirado/não existir
   */
  getWithDefault<T>(key: string, defaultValue: T): Observable<T> {
    return this.get<T>(key).pipe(
      map(data => data || defaultValue)
    );
  }

  /**
   * Remove um item do cache
   * @param key Chave do item
   */
  remove(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Verifica se um item existe no cache e não está expirado
   * @param key Chave do item
   * @returns boolean
   */
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Define o tempo de vida padrão para novos itens
   * @param ttl Tempo de vida em milissegundos
   */
  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }
} 