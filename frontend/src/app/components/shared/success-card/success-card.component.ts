import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success-card',
  imports: [],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.css',
  host: {
    class: 'absolute -top-[20px] left-1/2 -translate-x-1/2 z-20',
  },
})
export class SuccessCardComponent {
  title = input.required<string>();
}
