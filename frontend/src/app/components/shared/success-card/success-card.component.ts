import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success-card',
  imports: [],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.css',
  host: {},
})
export class SuccessCardComponent {
  title = input.required<string>();
}
