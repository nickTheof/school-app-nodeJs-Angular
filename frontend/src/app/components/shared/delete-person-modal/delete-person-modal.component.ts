import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-person-modal',
  imports: [],
  templateUrl: './delete-person-modal.component.html',
  styleUrl: './delete-person-modal.component.css',
  host: {
    class:
      'flex fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-2',
  },
})
export class DeletePersonModalComponent {
  toConfirmDelete = output();
  toCancelDelete = output();

  onConfirmDelete() {
    this.toConfirmDelete.emit();
  }

  onCancelDelete() {
    this.toCancelDelete.emit();
  }
}
