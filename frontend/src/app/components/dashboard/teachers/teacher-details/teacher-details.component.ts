import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PersonDetailsComponent } from '../../../shared/person-details/person-details.component';
import {
  TeacherService,
  DEFAULT_TEACHER,
} from '../../../../shared/services/teacher.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UiServicesService } from '../../../../shared/services/ui-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Teacher } from '../../../../shared/interfaces/teacher';

@Component({
  selector: 'app-teacher-details',
  imports: [PersonDetailsComponent],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css',
})
export class TeacherDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private teacherService = inject(TeacherService);
  private uiServices = inject(UiServicesService);
  person = signal<Teacher>(DEFAULT_TEACHER);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (val: ParamMap) => {
        this.uiServices.activateLoading();
        this.teacherService
          .getTeacherByUuid(val.get('teacherId') || '')
          .subscribe({
            next: (resp) => {
              this.uiServices.deactivateLoading();
              this.person.set(resp.data);
            },
            error: (err: HttpErrorResponse) => {
              this.uiServices.deactivateLoading();
              this.uiServices.setError({
                title: 'Σφάλμα!',
                description: err?.error?.message || 'Άγνωστο σφάλμα',
              });
            },
          });
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  title = 'Στοιχεία Εκπαιδευτή';
}
