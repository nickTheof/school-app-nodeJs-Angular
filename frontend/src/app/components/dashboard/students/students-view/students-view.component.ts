import { Component } from '@angular/core';
import { PersonView } from '../../../../shared/interfaces/person';
import { PersonsViewComponent } from '../../../shared/persons-view/persons-view.component';

@Component({
  selector: 'app-students',
  imports: [PersonsViewComponent],
  templateUrl: './students-view.component.html',
  styleUrl: './students-view.component.css',
})
export class StudentsViewComponent {
  title = 'Μητρώο Μαθητών';
  studentsData: PersonView[] = [
    {
      uuid: '12',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'student',
    },
    {
      uuid: '13',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'student',
    },
    {
      uuid: '14',
      firstname: 'takis',
      lastname: 'Tak',
      entity: 'student',
    },
  ];
}
