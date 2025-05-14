import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-details',
  imports: [],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css',
  host: {
    class:
      'flex flex-col items-center justify-center min-h-[calc(100vh-200px)]',
  },
})
export class TeacherDetailsComponent {
  cities = [
    { id: 1, name: 'Αθήνα' },
    { id: 2, name: 'Θεσσαλονίκη' },
    { id: 3, name: 'Χανιά' },
  ];

  teacher = {
    uuid: '1',
    firstname: 'Nikolaos',
    lastname: 'Theofanis',
    vat: '199199199',
    fatherName: 'Christos',
    phoneNum: '2102102100',
    email: 'ntheof@aueb.gr',
    zipcode: '11111',
    street: 'Aitolou',
    streetNum: '56',
    cityId: 1,
  };
}
