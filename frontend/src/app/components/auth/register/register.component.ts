import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControlComponent } from '../../shared/ui/form-control/form-control.component';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormControlComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
