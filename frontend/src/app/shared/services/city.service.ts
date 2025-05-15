import { Injectable, signal } from '@angular/core';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private _cities = signal<City[]>([
    { id: 1, name: 'Αθήνα' },
    { id: 2, name: 'Θεσσαλονίκη' },
    { id: 3, name: 'Χανιά' },
  ]);

  cities = this._cities.asReadonly();

  constructor() {}
}
