import { Component, output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
})
export class BackButtonComponent {
  clickedBackwards = output();

  onClick() {
    this.clickedBackwards.emit();
  }
}
