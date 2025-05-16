import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorCardComponent } from '../error-card/error-card.component';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, ErrorCardComponent],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
})
export class NotFoundPageComponent {}
