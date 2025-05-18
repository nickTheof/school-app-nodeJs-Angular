import { inject, Injectable, signal } from '@angular/core';
import { City } from '../interfaces/city';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000/api/v1/cities';
const ttlMs = 15 * 60 * 1000; //15 minutes

interface HttpCityResponse {
  status: string;
  data: City[];
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private http = inject(HttpClient);
  private _citiesCache = signal<City[]>([]);
  private _lastFetched = signal<number | null>(null);

  readonly cities = this._citiesCache.asReadonly();

  getAll(forceRefresh = false): Observable<HttpCityResponse> {
    if (!forceRefresh && !this.isCacheStale()) {
      return of({ status: 'success', data: [...this.cities()] });
    }
    return this.http.get<HttpCityResponse>(`${BASE_API_URL}`).pipe(
      tap((resp) => {
        this.setData(resp.data);
      })
    );
  }

  private isCacheStale(): boolean {
    const last = this._lastFetched();
    return !last || Date.now() - last > ttlMs;
  }

  private invalidateCache() {
    this._lastFetched.set(null);
  }

  private setData(data: City[]) {
    this._citiesCache.set([...data]);
    this._lastFetched.set(Date.now());
  }
}
