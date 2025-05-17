import { Component } from '@angular/core';
import { Person } from '../../../../shared/interfaces/person';
import { PersonDetailsComponent } from '../../../shared/person-details/person-details.component';

@Component({
  selector: 'app-student-details',
  imports: [PersonDetailsComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent {
  title = 'Στοιχεία Μαθητή';

  person: Person = {
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
    city: '1',
  };

  // person = undefined;
}
