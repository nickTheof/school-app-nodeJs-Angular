import { Component, inject, input, output } from '@angular/core';
import { PersonView } from '../../../shared/interfaces/person';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-persons-view',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './persons-view.component.html',
  styleUrl: './persons-view.component.css',
})
export class PersonsViewComponent {
  private authService = inject(AuthService);

  isAdminOrReader = this.authService.isAdminOrEditor();

  personsData = input.required<PersonView[]>();
  title = input.required<string>();
  personUuidToDelete = output<string>();

  filterSubmitted = output<{ firstname: string; lastname: string }>();
  filterCleared = output();

  filterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
  });

  onDelete(uuid: string) {
    this.personUuidToDelete.emit(uuid);
  }

  onClearForm() {
    this.filterForm.reset();
    this.filterCleared.emit();
  }

  onsubmitFilterForm() {
    const filterObj = {
      firstname: this.filterForm.value.firstname || '',
      lastname: this.filterForm.value.lastname || '',
    };
    this.filterSubmitted.emit(filterObj);
  }
}
