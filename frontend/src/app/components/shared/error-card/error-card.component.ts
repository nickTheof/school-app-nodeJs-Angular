import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.css',
  host: {
    class: 'flex justify-center my-6',
  },
})
export class ErrorCardComponent {
  error = input.required<{ title: string; description: string }>();
}
