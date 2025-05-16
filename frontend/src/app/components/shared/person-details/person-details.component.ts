import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { CityService } from '../../../shared/services/city.service';
import { Person } from '../../../shared/interfaces/person';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ErrorCardComponent } from '../error-card/error-card.component';

@Component({
  selector: 'app-person-details',
  imports: [BackButtonComponent, ErrorCardComponent],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css',
  host: {
    class:
      'w-full flex flex-col items-center justify-center min-h-[calc(100vh-200px)]',
  },
})
export class PersonDetailsComponent {
  private cityService = inject(CityService);
  private location = inject(Location);
  cities = this.cityService.cities;

  title = input.required<string>();
  personData = input.required<Person | undefined>();

  onclickBackwards() {
    this.location.back();
  }
}
