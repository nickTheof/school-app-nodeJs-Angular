import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers-view',
  imports: [],
  templateUrl: './teachers-view.component.html',
  styleUrl: './teachers-view.component.css',
})
export class TeachersViewComponent {
  teachersData: { uuid: string; firstname: string; lastname: string }[] = [
    {
      uuid: '12',
      firstname: 'takis',
      lastname: 'Tak',
    },
    {
      uuid: '12',
      firstname: 'takis',
      lastname: 'Tak',
    },
    {
      uuid: '12',
      firstname: 'takis',
      lastname: 'Tak',
    },
  ];
}
