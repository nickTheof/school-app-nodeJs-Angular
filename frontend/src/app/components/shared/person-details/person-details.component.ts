import { Component, inject, input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CityService } from '../../../shared/services/city.service';
import { Person } from '../../../shared/interfaces/person';
import { BackButtonComponent } from '../back-button/back-button.component';
import { INPUT_FORM_FIELDS } from '../person-insert/insert-input-form-fields';
import { UiServicesService } from '../../../shared/services/ui-services.service';

@Component({
  selector: 'app-person-details',
  imports: [BackButtonComponent],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css',
  host: {
    class:
      'w-full flex flex-col items-center justify-center min-h-[calc(100vh-200px)] m-4 lg:m-2',
  },
})
export class PersonDetailsComponent implements OnInit {
  private cityService = inject(CityService);
  private uiService = inject(UiServicesService);

  private location = inject(Location);
  cities = this.cityService.cities;

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

  title = input.required<string>();
  personData = input.required<Person>();
  personFields = INPUT_FORM_FIELDS;

  getPersonDetailsField(controlName: keyof Person) {
    return this.personData()?.[controlName];
  }

  onclickBackwards() {
    this.location.back();
  }
}
