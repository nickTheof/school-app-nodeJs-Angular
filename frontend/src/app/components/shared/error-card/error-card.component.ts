import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.css',
  host: {
    class:
      'absolute top-1/8 left-1/2 -translate-x-1/2 z-20 flex justify-center my-6 w-1/2',
  },
})
export class ErrorCardComponent {
  error = input.required<{ title: string; description: string }>();
}
