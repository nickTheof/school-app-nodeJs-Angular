import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControlComponent } from '../../shared/form-control/form-control.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getError } from '../../../shared/utils/field.validator';
import { Credentials } from '../../../shared/interfaces/auth';
import { AuthService } from '../../../shared/services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormControlComponent,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  error = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor() {
    // effect(() => {
    //   if (this.error()) {
    //     setTimeout(() => {
    //       this.error.set('');
    //     }, 3000);
    //   }
    // });
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getErrors = getError;

  login() {
    this.isLoading.set(true);
    const credentials: Credentials = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };
    this.authService.loginUser(credentials).subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(err.error.message);
        this.form.reset();
      },
    });
  }
}
