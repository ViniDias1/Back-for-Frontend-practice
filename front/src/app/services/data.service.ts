import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PocketBasePaginatedResponse } from '../interfaces/PocketBasePaginated.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = 'http://localhost:3000/api/sabia-paineis';

  private readonly http = inject(HttpClient);

  getSabiaPaineis<T>(onlyInternet?: boolean): Observable<T[]> {
    let params = new HttpParams();

    if (onlyInternet !== undefined) {
      params = params.set('internet', onlyInternet.toString());
    }

    return this.http
      .get<PocketBasePaginatedResponse>(this.apiUrl, { params })
      .pipe(map((response) => response.items as T[]));
  }
}
