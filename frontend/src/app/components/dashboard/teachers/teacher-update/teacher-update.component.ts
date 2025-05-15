import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonUpdateComponent } from '../../../shared/person-update/person-update.component';
import { Person } from '../../../../shared/interfaces/person';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-update',
  imports: [PersonUpdateComponent],
  templateUrl: './teacher-update.component.html',
  styleUrl: './teacher-update.component.css',
})
export class TeacherUpdateComponent {
  private location = inject(Location);

  teacher: Person = {
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

  // teacher: Person = {
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
    firstname: new FormControl(this.teacher.firstname, Validators.required),
    lastname: new FormControl(this.teacher.lastname, Validators.required),
    vat: new FormControl(this.teacher.vat, [
      Validators.required,
      Validators.pattern('^\\d{9}$'),
    ]),
    fathername: new FormControl(this.teacher.fathername, Validators.required),
    phoneNum: new FormControl(this.teacher.phoneNum, [
      Validators.required,
      Validators.pattern('^\\d{10,13}$'),
    ]),
    email: new FormControl(this.teacher.email, [
      Validators.required,
      Validators.email,
    ]),
    address: new FormControl(this.teacher.address, Validators.required),
    streetNum: new FormControl(this.teacher.streetNum, [
      Validators.required,
      Validators.pattern('^\\d{1,5}[A-Z]{0,2}$'),
    ]),
    zipcode: new FormControl(this.teacher.zipcode, [
      Validators.required,
      Validators.pattern('^\\d{5,}$'),
    ]),
    city: new FormControl<number>(this.teacher.cityId, Validators.required),
  });

  formTitle = 'Ενημέρωση Στοιχείων Εκπαιδευτή';

  onSubmit() {
    console.log('http:teachers', this.form);
  }

  onClickBackwards() {
    this.location.back();
  }
}
