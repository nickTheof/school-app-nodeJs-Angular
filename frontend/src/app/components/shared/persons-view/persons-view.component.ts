import { Component, input } from '@angular/core';
import { PersonView } from '../../../shared/interfaces/person';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-persons-view',
  imports: [RouterLink],
  templateUrl: './persons-view.component.html',
  styleUrl: './persons-view.component.css',
})
export class PersonsViewComponent {
  personsData = input.required<PersonView[]>();
  title = input.required<string>();
}
