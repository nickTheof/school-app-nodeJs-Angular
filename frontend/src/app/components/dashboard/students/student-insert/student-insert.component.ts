import { Component, inject } from '@angular/core';
import { PersonInsertComponent } from '../../../shared/person-insert/person-insert.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-insert',
  imports: [PersonInsertComponent],
  templateUrl: './student-insert.component.html',
  styleUrl: './student-insert.component.css',
})
export class StudentInsertComponent {
  private location = inject(Location);

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
    city: new FormControl<number>(1, Validators.required),
  });

  formTitle = 'Στοιχεία Μαθητή';

  onSubmit() {
    console.log('http:students', this.form);
  }

  onClickBackwards() {
    this.location.back();
  }
}
