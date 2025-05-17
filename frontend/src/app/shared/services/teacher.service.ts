import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Person, PersonInsertDTO, PersonUpdateDTO } from '../interfaces/person';
import { tap } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000/api/v1/teachers';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private http = inject(HttpClient);

  private _teachers = signal<Person[]>([]);
  private _teacherDetail = signal<Person>({
    uuid: '',
    firstname: '',
    lastname: '',
    vat: '',
    fathername: '',
    phoneNum: '',
    email: '',
    zipcode: '',
    address: '',
    streetNum: '',
    city: '',
  });

  teachers = this._teachers.asReadonly();
  teacherDetail = this._teacherDetail.asReadonly();

  teachersView = computed(() => {
    return this._teachers().map((t) => {
      return {
        uuid: t.uuid,
        firstname: t.firstname,
        lastname: t.lastname,
        entity: 'teacher',
      };
    });
  });

  getAll() {
    return this.http
      .get<{ status: string; data: Person[] }>(`${BASE_API_URL}`)
      .pipe(
        tap((resp) => {
          this._teachers.set(resp.data);
        })
      );
  }

  getTeacherByUuid(uuid: string) {
    return this.http
      .get<{ status: string; data: Person }>(`${BASE_API_URL}/${uuid}`)
      .pipe(
        tap((resp) => {
          this._teacherDetail.set(resp.data);
        })
      );
  }

  createTeacher(teacher: PersonInsertDTO) {
    return this.http.post<{ status: string; data: Person }>(
      `${BASE_API_URL}`,
      teacher
    );
  }

  updateTeacher(uuid: string, teacher: PersonUpdateDTO) {
    return this.http.patch<{ status: string; data: Person }>(
      `${BASE_API_URL}/${uuid}`,
      teacher
    );
  }

  deleteTeacher(uuid: string) {
    return this.http.delete<{ status: string; data: Person }>(
      `${BASE_API_URL}/${uuid}`
    );
  }
}
