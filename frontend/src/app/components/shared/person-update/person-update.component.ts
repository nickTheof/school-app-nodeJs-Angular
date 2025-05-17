import { Component, inject, input, OnInit, output } from '@angular/core';
import { INPUT_FORM_FIELDS } from '../person-insert/insert-input-form-fields';
import { CityService } from '../../../shared/services/city.service';
import { PersonInputFormControlComponent } from '../person-input-form-control/person-input-form-control.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../shared/interfaces/person';
import { BackButtonComponent } from '../back-button/back-button.component';
import { getError } from '../../../shared/utils/field.validator';
import { UiServicesService } from '../../../shared/services/ui-services.service';

@Component({
  selector: 'app-person-update',
  imports: [
    PersonInputFormControlComponent,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './person-update.component.html',
  styleUrl: './person-update.component.css',
})
export class PersonUpdateComponent implements OnInit {
  private cityService = inject(CityService);
  private uiService = inject(UiServicesService);

  personDetails = input.required<Person | null>();
  formGroup = input.required<FormGroup>();
  formTitle = input.required<string>();
  clickedSubmit = output();
  clickedBackwards = output();

  formFields = INPUT_FORM_FIELDS;
  cities = this.cityService.cities;

  getError = getError;

  ngOnInit(): void {
    this.uiService.activateLoading();
    this.cityService.getAll().subscribe({
      next: () => {
        this.uiService.deactivateLoading();
        this.uiService.clearError();
      },
      error: (err) => {
        this.uiService.deactivateLoading();
        this.uiService.setError({
          title: 'Σφάλμα!',
          description: err.error.message,
        });
      },
    });
  }

  getPersonDetailsField(controlName: keyof Person) {
    return this.personDetails()?.[controlName];
  }

  onClickSubmit() {
    this.clickedSubmit.emit();
  }

  onClickBackwards() {
    this.clickedBackwards.emit();
  }
}
