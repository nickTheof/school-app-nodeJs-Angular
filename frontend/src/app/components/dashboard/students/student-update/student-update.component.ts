import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonUpdateComponent } from '../../../shared/person-update/person-update.component';
import { Person } from '../../../../shared/interfaces/person';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-update',
  imports: [PersonUpdateComponent],
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css',
})
export class StudentUpdateComponent {
  private location = inject(Location);

  student: Person = {
    uuid: '1',
    firstname: 'Nikolaos',
    lastname: 'Theofanis',
    vat: '199199199',
    fathername: 'Christos',
    phoneNum: '2102102100',
    email: 'ntheof@aueb.gr',
    zipcode: '11111',
    address: 'Aitolou',
    streetNum: '56',
    cityId: 2,
  };

  // student: Person = {
  //   uuid: '',
  //   firstname: '',
  //   lastname: '',
  //   vat: '',
  //   fathername: '',
  //   phoneNum: '',
  //   email: '',
  //   zipcode: '',
  //   address: '',
  //   streetNum: '',
  //   cityId: 0,
  // };
  form = new FormGroup({
    firstname: new FormControl(this.student.firstname, Validators.required),
    lastname: new FormControl(this.student.lastname, Validators.required),
    vat: new FormControl(this.student.vat, [
      Validators.required,
      Validators.pattern('^\\d{9}$'),
    ]),
    fathername: new FormControl(this.student.fathername, Validators.required),
    phoneNum: new FormControl(this.student.phoneNum, [
      Validators.required,
      Validators.pattern('^\\d{10,13}$'),
    ]),
    email: new FormControl(this.student.email, [
      Validators.required,
      Validators.email,
    ]),
    address: new FormControl(this.student.address, Validators.required),
    streetNum: new FormControl(this.student.streetNum, [
      Validators.required,
      Validators.pattern('^\\d{1,5}[A-Z]{0,2}$'),
    ]),
    zipcode: new FormControl(this.student.zipcode, [
      Validators.required,
      Validators.pattern('^\\d{5,}$'),
    ]),
    city: new FormControl<number>(this.student.cityId, Validators.required),
  });

  formTitle = 'Ενημέρωση Στοιχείων Μαθητή';

  onSubmit() {
    console.log('http:students', this.form);
  }

  onClickBackwards() {
    this.location.back();
  }
}
