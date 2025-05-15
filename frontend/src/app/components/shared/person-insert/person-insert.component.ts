import { Component, inject, input, output } from '@angular/core';
import { INPUT_FORM_FIELDS } from './insert-input-form-fields';
import { CityService } from '../../../shared/services/city.service';
import { PersonInputFormControlComponent } from '../person-input-form-control/person-input-form-control.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-person-insert',
  imports: [
    PersonInputFormControlComponent,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './person-insert.component.html',
  styleUrl: './person-insert.component.css',
})
export class PersonInsertComponent {
  formGroup = input.required<FormGroup>();
  formTitle = input.required<string>();
  clickedSubmit = output();
  clickedBackwards = output();

  formFields = INPUT_FORM_FIELDS;
  private cityService = inject(CityService);
  cities = this.cityService.cities;

  getError(controlName: string): string | null {
    const control = this.formGroup().get(controlName);
    if (control && control.touched && control.invalid) {
      if (control.errors?.['required'])
        return 'Αυτό το πεδίο είναι υποχρεωτικό';
      if (control.errors?.['pattern']) return 'Μη έγκυρη μορφή';
      if (control.errors?.['email']) return 'Μη έγκυρη μορφή email';
    }
    return null;
  }

  onClickSubmit() {
    this.clickedSubmit.emit();
  }

  onClickBackwards() {
    this.clickedBackwards.emit();
  }
}
