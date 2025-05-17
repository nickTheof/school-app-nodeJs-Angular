import { Component, inject, signal } from '@angular/core';
import { PersonInsertComponent } from '../../../shared/person-insert/person-insert.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TeacherService } from '../../../../shared/services/teacher.service';
import { PersonInsertDTO } from '../../../../shared/interfaces/person';
import { Router } from '@angular/router';
import { UiServicesService } from '../../../../shared/services/ui-services.service';

@Component({
  selector: 'app-teacher-insert',
  imports: [PersonInsertComponent],
  templateUrl: './teacher-insert.component.html',
  styleUrl: './teacher-insert.component.css',
  host: {
    class: 'min-h-[calc(100vh-200px)]',
  },
})
export class TeacherInsertComponent {
  private location = inject(Location);
  private router = inject(Router);
  private teacherService = inject(TeacherService);
  private uiServices = inject(UiServicesService);

  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    vat: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{9}$'),
    ]),
    fathername: new FormControl('', Validators.required),
    phoneNum: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{10,13}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    streetNum: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{1,5}[A-Z]{0,2}$'),
    ]),
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{5,}$'),
    ]),
    city: new FormControl<string>('', Validators.required),
  });

  formTitle = 'Στοιχεία Εκπαιδευτή';

  onSubmit() {
    this.uiServices.activateLoading();
    const teacherToInsert: PersonInsertDTO = this.getTeacherInsertDTO();

    this.teacherService.createTeacher(teacherToInsert).subscribe({
      next: (resp) => {
        this.uiServices.deactivateLoading();
        this.uiServices.clearError();
        const insertedTeacherUuid = resp.data.uuid;
        this.router.navigate(
          ['/dashboard', 'teachers', 'teacher', insertedTeacherUuid],
          {
            replaceUrl: true,
          }
        );
      },
      error: (err) => {
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

  private getTeacherInsertDTO(): PersonInsertDTO {
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
