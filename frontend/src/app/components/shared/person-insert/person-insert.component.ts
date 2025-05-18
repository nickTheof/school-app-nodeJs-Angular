import { Component, inject, input, OnInit, output } from '@angular/core';
import { INPUT_FORM_FIELDS } from './insert-input-form-fields';
import { CityService } from '../../../shared/services/city.service';
import { PersonInputFormControlComponent } from '../person-input-form-control/person-input-form-control.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackButtonComponent } from '../back-button/back-button.component';
import { getError } from '../../../shared/utils/field.validator';
import { UiServicesService } from '../../../shared/services/ui-services.service';

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
export class PersonInsertComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  formTitle = input.required<string>();
  clickedSubmit = output();
  clickedBackwards = output();

  formFields = INPUT_FORM_FIELDS;
  private cityService = inject(CityService);
  private uiService = inject(UiServicesService);
  cities = this.cityService.cities;

  ngOnInit(): void {
    this.uiService.activateLoading();
    this.cityService.getAll().subscribe({
      next: () => {
        this.uiService.deactivateLoading();
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

  getError = getError;

  onClickSubmit() {
    this.clickedSubmit.emit();
  }

  onClickBackwards() {
    this.clickedBackwards.emit();
  }
}
