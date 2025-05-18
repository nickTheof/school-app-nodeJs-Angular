import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import {
  Teacher,
  TeacherInsertDTO,
  TeacherUpdateDTO,
  TeacherView,
} from '../interfaces/teacher';
import { map, Observable, of, tap } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000/api/v1/teachers';
export const DEFAULT_TEACHER: Teacher = {
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

const ttlMs = 60 * 5 * 1000; // 5 minutes

interface HttpAllTeachersResponse {
  status: string;
  data: Teacher[];
}

interface HttpTeacherResponse {
  status: string;
  data: Teacher;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private http = inject(HttpClient);

  private _teachersCache = signal<Teacher[]>([]);
  private _lastFetched = signal<number | null>(null);
  private _mapTeacherDetailsCache = new Map<string, Teacher>();

  private refreshIntervalId: ReturnType<typeof setInterval> | null = null;
  private autoRefreshStarted = false;

  readonly teachers = this._teachersCache.asReadonly();

  readonly teachersView: Signal<TeacherView[]> = computed(() => {
    return this._teachersCache().map((t) => {
      return {
        uuid: t.uuid,
        firstname: t.firstname,
        lastname: t.lastname,
        entity: 'teacher',
      };
    });
  });

  getAll(forceRefresh = false): Observable<HttpAllTeachersResponse> {
    if (!forceRefresh && !this.isCacheStale()) {
      return of({ status: 'success', data: [...this.teachers()] });
    }
    return this.http.get<HttpAllTeachersResponse>(`${BASE_API_URL}`).pipe(
      tap((resp) => {
        this.setData(resp.data);
      })
    );
  }

  getTeacherByUuid(
    uuid: string,
    forceRefresh = false
  ): Observable<HttpTeacherResponse> {
    const checkCache = this.getByUuid(uuid);

    if (checkCache && !forceRefresh && !this.isCacheStale()) {
      return of({ status: 'success', data: { ...checkCache } });
    }
    return this.http.get<HttpTeacherResponse>(`${BASE_API_URL}/${uuid}`).pipe(
      tap((resp) => {
        this._mapTeacherDetailsCache.set(resp.data.uuid, resp.data);
      })
    );
  }

  createTeacher(teacher: TeacherInsertDTO): Observable<HttpTeacherResponse> {
    return this.http.post<HttpTeacherResponse>(`${BASE_API_URL}`, teacher).pipe(
      tap(() => {
        this.invalidateCache();
      })
    );
  }

  updateTeacher(
    uuid: string,
    teacher: TeacherUpdateDTO
  ): Observable<HttpTeacherResponse> {
    return this.http
      .patch<HttpTeacherResponse>(`${BASE_API_URL}/${uuid}`, teacher)
      .pipe(
        tap(() => {
          this.invalidateCache();
        })
      );
  }

  deleteTeacher(uuid: string): Observable<HttpTeacherResponse> {
    return this.http
      .delete<HttpTeacherResponse>(`${BASE_API_URL}/${uuid}`)
      .pipe(
        tap(() => {
          this.invalidateCache();
        })
      );
  }

  getFiltered(filter: {
    firstname: string;
    lastname: string;
  }): Observable<TeacherView[]> {
    return this.http
      .get<HttpAllTeachersResponse>(
        `${BASE_API_URL}/filtered?firstname=${filter.firstname}&lastname=${filter.lastname}`
      )
      .pipe(
        map((resp) =>
          resp.data.map((t) => ({
            uuid: t.uuid,
            firstname: t.firstname,
            lastname: t.lastname,
            entity: 'teacher',
          }))
        )
      );
  }

  private isCacheStale(): boolean {
    const last = this._lastFetched();
    return !last || Date.now() - last > ttlMs;
  }

  private invalidateCache(): void {
    this._lastFetched.set(null);
    this.clearCache();
  }

  private setData(data: Teacher[]): void {
    this._teachersCache.set(data);
    this._lastFetched.set(Date.now());
    data.forEach((t) => {
      this._mapTeacherDetailsCache.set(t.uuid, { ...t });
    });
  }

  private getByUuid(uuid: string): Teacher | undefined {
    const found = this._mapTeacherDetailsCache.get(uuid);
    return found ? { ...found } : undefined;
  }

  private clearCache(): void {
    this._teachersCache.set([]);
    this._mapTeacherDetailsCache.clear();
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
