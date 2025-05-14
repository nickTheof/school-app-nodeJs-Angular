import { Component, input } from '@angular/core';

@Component({
  selector: 'app-person-input-form-control',
  imports: [],
  templateUrl: './person-input-form-control.component.html',
  styleUrl: './person-input-form-control.component.css',
})
export class PersonInputFormControlComponent {
  inputInfo = input.required<{ labelId: string; text: string }>();
  errorInField = input<string>();
}
