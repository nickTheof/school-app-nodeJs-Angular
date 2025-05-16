import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserInsertDTO } from '../interfaces/user';

const API_AUTH_BASE_URL = 'http://localhost:3000/api/v1/auth';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private http = inject(HttpClient);

  registerUser(user: UserInsertDTO) {
    return this.http.post(`${API_AUTH_BASE_URL}/register`, user);
  }
}
