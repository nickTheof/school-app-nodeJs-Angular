import { Component, inject, input } from '@angular/core';
import { PersonView } from '../../../shared/interfaces/person';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-persons-view',
  imports: [RouterLink],
  templateUrl: './persons-view.component.html',
  styleUrl: './persons-view.component.css',
})
export class PersonsViewComponent {
  private authService = inject(AuthService);

  isAdminOrReader = this.authService.isAdminOrEditor();

  personsData = input.required<PersonView[]>();
  title = input.required<string>();
}
