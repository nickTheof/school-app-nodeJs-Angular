import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorCardComponent } from '../error-card/error-card.component';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, ErrorCardComponent],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {}
