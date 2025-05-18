import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import {
  Student,
  StudentInsertDTO,
  StudentUpdateDTO,
  StudentView,
} from '../interfaces/student';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleStateUi } from '../utils/handle-ui-state';
import { UiServicesService } from './ui-services.service';

interface HttpAllStudentsResponse {
  status: string;
  data: Student[];
}

interface HttpStudentResponse {
  status: string;
  data: Student;
}

const ttlMs = 5 * 60 * 1000;

const BASE_API_URL = 'http://localhost:3000/api/v1/students';
export const DEFAULT_STUDENT: Student = {
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
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);
  private uiServices = inject(UiServicesService);

  private _studentsCache = signal<Student[]>([]);
  private _lastFetched = signal<number | null>(null);
  private _mapStudentDetailsCache = new Map<string, Student>();
  private refreshIntervalId: ReturnType<typeof setInterval> | null = null;
  private autoRefreshStarted = false;

  readonly students = this._studentsCache.asReadonly();

  readonly studentsView: Signal<StudentView[]> = computed(() => {
    return this._studentsCache().map((t) => {
      return {
        uuid: t.uuid,
        firstname: t.firstname,
        lastname: t.lastname,
        entity: 'student',
      };
    });
  });

  private isCacheStale(): boolean {
    const last = this._lastFetched();
    return !last || Date.now() - last > ttlMs;
  }

  private invalidateCache(): void {
    this._lastFetched.set(null);
    this.clearCache();
  }

  private clearCache() {
    this._studentsCache.set([]);
    this._mapStudentDetailsCache.clear();
  }

  private setData(data: Student[]) {
    this._studentsCache.set([...data]);
    this._lastFetched.set(Date.now());
    data.forEach((student) => {
      this._mapStudentDetailsCache.set(student.uuid, { ...student });
    });
  }

  private getByUuid(uuid: string): Student | undefined {
    const found = this._mapStudentDetailsCache.get(uuid);
    return found ? { ...found } : undefined;
  }

  getAll(forceRefresh = false): Observable<HttpAllStudentsResponse> {
    if (!forceRefresh && !this.isCacheStale()) {
      return of({ status: 'success', data: [...this.students()] });
    }
    return this.http.get<HttpAllStudentsResponse>(`${BASE_API_URL}`).pipe(
      tap((resp) => {
        this.setData(resp.data);
      }),
      handleStateUi(this.uiServices)
    );
  }

  getStudentByUuid(
    uuid: string,
    forceRefresh = false
  ): Observable<HttpStudentResponse> {
    const checkCache = this.getByUuid(uuid);

    if (checkCache && !forceRefresh && !this.isCacheStale()) {
      return of({ status: 'success', data: { ...checkCache } });
    }
    return this.http.get<HttpStudentResponse>(`${BASE_API_URL}/${uuid}`).pipe(
      tap((resp) => {
        this._mapStudentDetailsCache.set(resp.data.uuid, resp.data);
      }),
      handleStateUi(this.uiServices)
    );
  }

  createStudent(Student: StudentInsertDTO): Observable<HttpStudentResponse> {
    return this.http.post<HttpStudentResponse>(`${BASE_API_URL}`, Student).pipe(
      tap(() => {
        this.invalidateCache();
      }),
      handleStateUi(this.uiServices)
    );
  }

  updateStudent(
    uuid: string,
    Student: StudentUpdateDTO
  ): Observable<HttpStudentResponse> {
    return this.http
      .patch<HttpStudentResponse>(`${BASE_API_URL}/${uuid}`, Student)
      .pipe(
        tap(() => {
          this.invalidateCache();
        }),
        handleStateUi(this.uiServices)
      );
  }

  deleteStudent(uuid: string): Observable<HttpStudentResponse> {
    return this.http
      .delete<HttpStudentResponse>(`${BASE_API_URL}/${uuid}`)
      .pipe(
        tap(() => {
          this.invalidateCache();
        }),
        handleStateUi(this.uiServices)
      );
  }

  startAutoRefresh(): void {
    if (this.autoRefreshStarted) return;
    this.autoRefreshStarted = true;

    this.refreshIntervalId = setInterval(() => {
      if (this.isCacheStale()) {
        this.getAll(true).subscribe();
      }
    }, ttlMs);
  }

  stopAutoRefresh(): void {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
      this.autoRefreshStarted = false;
    }
  }
}
