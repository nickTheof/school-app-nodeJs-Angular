import { computed, Injectable, signal } from '@angular/core';
import { ErrorCard } from '../interfaces/error';

const DEFAULT_ERROR = { title: '', description: '' };
const DEFAULT_SUCCESS = { title: '' };

@Injectable({
  providedIn: 'root',
})
export class UiServicesService {
  private _errorCard = signal<ErrorCard>(DEFAULT_ERROR);
  private _isLoading = signal<boolean>(false);
  private _successMessage = signal<{ title: string }>(DEFAULT_SUCCESS);

  errorCard = this._errorCard.asReadonly();
  isLoading = this._isLoading.asReadonly();
  successMessage = this._successMessage.asReadonly();

  errorExists = computed(() => {
    return (
      this._errorCard().title !== '' && this._errorCard().description !== ''
    );
  });

  successExists = computed(() => {
    return this._successMessage()?.title !== '';
  });

  clearError() {
    this._errorCard.set(DEFAULT_ERROR);
  }

  activateLoading() {
    this._isLoading.set(true);
  }

  deactivateLoading() {
    this._isLoading.set(false);
  }

  setSuccess(message: { title: string }, timeout = 1500) {
    this._successMessage.set(message);
    setTimeout(() => {
      this._successMessage.set(DEFAULT_SUCCESS);
    }, timeout);
  }

  setError(error: ErrorCard, timeout = 1500) {
    this._errorCard.set(error);
    setTimeout(() => {
      this._errorCard.set(DEFAULT_ERROR);
    }, timeout);
  }
}
