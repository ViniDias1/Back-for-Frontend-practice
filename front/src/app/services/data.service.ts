import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { PocketBasePaginatedResponse } from '../interfaces/PocketBasePaginated.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = 'http://localhost:3000/api/sabia-paineis';
  private readonly mockUrl = 'http://localhost:3001/sabia-paineis'; // URL do mock

  private readonly http = inject(HttpClient);

  private readonly cache = new Map<string, Observable<any[]>>();

  getSabiaPaineis<T>(onlyInternet?: boolean): Observable<T[]> {
    const cacheKey = `sabia-paineis-${onlyInternet}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Observable<T[]>;
    }

    let params = new HttpParams();

    if (onlyInternet !== undefined) {
      params = params.set('internet', onlyInternet.toString());
    }

    const $newRequest = this.http
      .get<PocketBasePaginatedResponse>(this.apiUrl, { params })
      .pipe(
        map((response) => response.items as T[]),
        shareReplay(1)
      );

    this.cache.set(cacheKey, $newRequest);

    return $newRequest as Observable<T[]>;
  }
}
