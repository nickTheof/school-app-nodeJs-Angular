import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormControlComponent } from '../../shared/form-control/form-control.component';
import { getError, equalValues } from '../../../shared/utils/field.validator';
import { ErrorCardComponent } from '../../shared/error-card/error-card.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormControlComponent,
    ErrorCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [equalValues('password', 'confirmPassword')]
  );

  getErrors = getError;

  //TODO Implement register functionality
  onRegisterUser() {
    this.error.set('HTTP ERROR');
  }
}
