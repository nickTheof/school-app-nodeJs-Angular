import { catchError, finalize, Observable, throwError } from 'rxjs';
import { UiServicesService } from '../services/ui-services.service';
import { HttpErrorResponse } from '@angular/common/http';

export function handleStateUi(ui: UiServicesService) {
  return <T>(source: Observable<T>) =>
    new Observable((observer) => {
      ui.activateLoading();
      source
        .pipe(
          finalize(() => ui.deactivateLoading()),
          catchError((err: HttpErrorResponse) => {
            ui.setError({
              title: 'Σφάλμα!',
              description:
                err.error.message || 'Αδυναμία επικοινωνίας. Προσπαθήστε ξανά.',
            });
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (val) => observer.next(val),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
    });
}
