import { Component } from '@angular/core';
import { PersonInputFormControlComponent } from '../../../shared/components/ui/person-input-form-control/person-input-form-control.component';

const formFields: { labelId: string; text: string; type: string }[] = [
  { labelId: 'firstname', text: 'Όνομα', type: 'text' },
  { labelId: 'lastname', text: 'Επώνυμο', type: 'text' },
  { labelId: 'vat', text: 'ΑΦΜ', type: 'text' },
  { labelId: 'fathername', text: 'Πατρώνυμο', type: 'text' },
  { labelId: 'phoneNum', text: 'Τηλέφωνο', type: 'text' },
  { labelId: 'email', text: 'Email', type: 'email' },
  { labelId: 'address', text: 'Διεύθυνση', type: 'text' },
  { labelId: 'streetNum', text: 'Αριθμός', type: 'text' },
  { labelId: 'zipcode', text: 'ΤΚ', type: 'text' },
];

@Component({
  selector: 'app-teacher-insert',
  imports: [PersonInputFormControlComponent],
  templateUrl: './teacher-insert.component.html',
  styleUrl: './teacher-insert.component.css',
  host: {
    class: 'min-h-[calc(100vh-200px)]',
  },
})
export class TeacherInsertComponent {
  formFields = formFields;

  cities = [
    { id: 1, name: 'Αθήνα' },
    { id: 2, name: 'Θεσσαλονίκη' },
    { id: 3, name: 'Χανιά' },
  ];
}
