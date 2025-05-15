import { Component } from '@angular/core';
import { PersonsViewComponent } from '../../../shared/persons-view/persons-view.component';
import { PersonView } from '../../../../shared/interfaces/person';

@Component({
  selector: 'app-teachers-view',
  imports: [PersonsViewComponent],
  templateUrl: './teachers-view.component.html',
  styleUrl: './teachers-view.component.css',
})
export class TeachersViewComponent {
  title = 'Μητρώο Εκπαιδευτών';
  teachersData: PersonView[] = [
    {
      uuid: '12',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'teacher',
    },
    {
      uuid: '13',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'teacher',
    },
    {
      uuid: '14',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'teacher',
    },
  ];
}
