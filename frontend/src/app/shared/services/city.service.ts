import { inject, Injectable, signal } from '@angular/core';
import { City } from '../interfaces/city';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000/api/v1/cities';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private http = inject(HttpClient);
  private _cities = signal<City[]>([]);

  cities = this._cities.asReadonly();

  getAll() {
    return this.http
      .get<{ status: string; data: City[] }>(`${BASE_API_URL}`)
      .pipe(
        tap((resp) => {
          this._cities.set(resp.data);
        })
      );
  }
}
