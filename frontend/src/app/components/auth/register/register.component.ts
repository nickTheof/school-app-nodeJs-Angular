import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormControlComponent } from '../../shared/form-control/form-control.component';
import { getError, equalValues } from '../../../shared/utils/field.validator';
import { ErrorCardComponent } from '../../shared/error-card/error-card.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { UserInsertDTO } from '../../../shared/interfaces/user';
import { UserRegistrationService } from '../../../shared/services/user-registration.service';
import { SuccessCardComponent } from '../../shared/success-card/success-card.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormControlComponent,
    SuccessCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private userRegistrationService = inject(UserRegistrationService);
  private router = inject(Router);

  error = signal<string>('');
  success = signal<boolean>(false);

  isLoading = signal<boolean>(false);
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
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

  onRegisterUser() {
    this.isLoading.set(true);
    const userToInsert: UserInsertDTO = {
      email: this.form.value.email || '',
      firstname: this.form.value.firstname || '',
      lastname: this.form.value.lastname || '',
      password: this.form.value.password || '',
      confirmPassword: this.form.value.confirmPassword || '',
    };
    this.userRegistrationService.registerUser(userToInsert).subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        this.success.set(true);
        this.router.navigate(['/register'], {
          replaceUrl: true,
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error.message);
        this.form.reset();
      },
    });
  }
}
