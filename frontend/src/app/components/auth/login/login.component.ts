import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControlComponent } from '../../shared/ui/form-control/form-control.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormControlComponent, FormControlComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
