import { Component, inject } from '@angular/core';
import { PersonInsertComponent } from '../../../shared/person-insert/person-insert.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { StudentService } from '../../../../shared/services/student.service';
import { StudentInsertDTO } from '../../../../shared/interfaces/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-insert',
  imports: [PersonInsertComponent],
  templateUrl: './student-insert.component.html',
  styleUrl: './student-insert.component.css',
  host: {
    class: 'min-h-[calc(100vh-200px)]',
  },
})
export class StudentInsertComponent {
  private location = inject(Location);
  private router = inject(Router);
  private studentService = inject(StudentService);

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
    const studentToInsert: StudentInsertDTO = this.getStudentInsertDTO();

    this.studentService.createStudent(studentToInsert).subscribe({
      next: (resp) => {
        const insertedStudentUuid = resp.data.uuid;
        this.router.navigate(
          ['/dashboard', 'students', 'student', insertedStudentUuid],
          {
            replaceUrl: true,
          }
        );
      },
      error: () => {
        this.form.reset();
      },
    });
  }

  onClickBackwards() {
    this.location.back();
  }

  private getStudentInsertDTO(): StudentInsertDTO {
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
