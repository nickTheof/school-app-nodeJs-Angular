import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonUpdateComponent } from '../../../shared/person-update/person-update.component';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  TeacherService,
  DEFAULT_TEACHER,
} from '../../../../shared/services/teacher.service';
import { UiServicesService } from '../../../../shared/services/ui-services.service';
import {
  Teacher,
  TeacherUpdateDTO,
} from '../../../../shared/interfaces/teacher';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-update',
  standalone: true,
  imports: [PersonUpdateComponent, ReactiveFormsModule],
  templateUrl: './teacher-update.component.html',
  styleUrl: './teacher-update.component.css',
})
export class TeacherUpdateComponent implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private teacherService = inject(TeacherService);
  private uiServices = inject(UiServicesService);
  person = signal<Teacher>(DEFAULT_TEACHER);
  formReady = false;

  form: FormGroup = new FormGroup({});

  formTitle = 'Ενημέρωση Στοιχείων Εκπαιδευτή';

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (val: ParamMap) => {
        this.uiServices.activateLoading();
        const uuid = val.get('teacherId') || '';

        this.teacherService.getTeacherByUuid(uuid).subscribe({
          next: (resp) => {
            this.uiServices.deactivateLoading();
            this.person.set(resp.data);
            this.buildForm();
          },
          error: (err: HttpErrorResponse) => {
            this.uiServices.deactivateLoading();
            this.uiServices.setError({
              title: 'Σφάλμα!',
              description: err.error.message,
            });
          },
        });
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  buildForm() {
    const p = this.person();

    this.form = new FormGroup({
      firstname: new FormControl(p.firstname, Validators.required),
      lastname: new FormControl(p.lastname, Validators.required),
      vat: new FormControl(p.vat, [
        Validators.required,
        Validators.pattern('^\\d{9}$'),
      ]),
      fathername: new FormControl(p.fathername, Validators.required),
      phoneNum: new FormControl(p.phoneNum, [
        Validators.required,
        Validators.pattern('^\\d{10,13}$'),
      ]),
      email: new FormControl(p.email, [Validators.required, Validators.email]),
      address: new FormControl(p.address, Validators.required),
      streetNum: new FormControl(p.streetNum, [
        Validators.required,
        Validators.pattern('^\\d{1,5}[A-Z]{0,2}$'),
      ]),
      zipcode: new FormControl(p.zipcode, [
        Validators.required,
        Validators.pattern('^\\d{5,}$'),
      ]),
      city: new FormControl<string>(p.city, Validators.required),
    });
    this.formReady = true;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.uiServices.setError({
        title: 'Σφάλμα!',
        description: 'Συμπληρώστε σωστά όλα τα πεδία της φόρμας.',
      });
      return;
    }

    this.uiServices.activateLoading();
    const teacherToUpdate: TeacherUpdateDTO = this.getTeacherUpdateDTO();

    this.teacherService
      .updateTeacher(this.person().uuid, teacherToUpdate)
      .subscribe({
        next: () => {
          this.uiServices.deactivateLoading();
          this.uiServices.clearError();
          this.router.navigate(
            ['/dashboard', 'teachers', 'teacher', this.person().uuid],
            {
              replaceUrl: true,
            }
          );
        },
        error: (err: HttpErrorResponse) => {
          this.form.reset();
          this.uiServices.deactivateLoading();
          this.uiServices.setError({
            title: 'Σφάλμα!',
            description: err.error.message,
          });
        },
      });
  }

  onClickBackwards() {
    this.location.back();
  }

  private getTeacherUpdateDTO(): TeacherUpdateDTO {
    return {
      firstname: this.form.value.firstname || '',
      lastname: this.form.value.lastname || '',
      vat: this.form.value.vat || '',
      fathername: this.form.value.fathername || '',
      phoneNum: this.form.value.phoneNum || '',
      email: this.form.value.email || '',
      zipcode: this.form.value.zipcode || '',
      address: this.form.value.address || '',
      streetNum: this.form.value.streetNum || '',
      city: this.form.value.city || '',
    };
  }
}
