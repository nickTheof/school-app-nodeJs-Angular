import { FormGroup } from '@angular/forms';

export function getError(
  form: FormGroup,
  controlName: string
): string | undefined {
  const control = form.get(controlName);
  if (control && control.touched && control.invalid) {
    if (control.errors?.['required']) return 'Αυτό το πεδίο είναι υποχρεωτικό';
    if (control.errors?.['pattern']) return 'Μη έγκυρη μορφή';
    if (control.errors?.['email']) return 'Μη έγκυρη μορφή email';
  }
  return undefined;
}
