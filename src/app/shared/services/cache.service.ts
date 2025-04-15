import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheItem {
  data: any;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, CacheItem> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  constructor() { }

  get<T>(key: string): Observable<T> | null {
    const item = this.cache.get(key);
    
    if (item && !this.isExpired(item.timestamp)) {
      return of(item.data);
    }
    
    return null;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_DURATION;
  }
} 