import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-control',
  imports: [],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
  host: {
    class: 'flex flex-col border-b-2 mb-2 h-24',
  },
})
export class FormControlComponent {
  inputInfo = input.required<{ labelId: string; text: string }>();
  errorInField = input<string>();
}
