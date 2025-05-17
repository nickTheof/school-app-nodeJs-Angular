import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonsViewComponent } from '../../../shared/persons-view/persons-view.component';
import { TeacherService } from '../../../../shared/services/teacher.service';
import { UiServicesService } from '../../../../shared/services/ui-services.service';
import { DeletePersonModalComponent } from '../../../shared/delete-person-modal/delete-person-modal.component';
import { SuccessCardComponent } from '../../../shared/success-card/success-card.component';

@Component({
  selector: 'app-teachers-view',
  imports: [
    PersonsViewComponent,
    DeletePersonModalComponent,
    SuccessCardComponent,
  ],
  templateUrl: './teachers-view.component.html',
  styleUrl: './teachers-view.component.css',
  host: {
    class: 'relative w-full',
  },
})
export class TeachersViewComponent implements OnInit {
  private teacherService = inject(TeacherService);
  private uiServices = inject(UiServicesService);

  showModal = signal<boolean>(false);
  toDeleteUuid = signal<string>('');

  teachersData = this.teacherService.teachersView;
  showSuccessCard = this.uiServices.successExists;
  successMessage = this.uiServices.successMessage;

  ngOnInit(): void {
    this.uiServices.activateLoading();
    this.teacherService.getAll().subscribe({
      next: () => {
        this.uiServices.deactivateLoading();
        this.uiServices.clearError();
      },
      error: (err) => {
        this.uiServices.deactivateLoading();
        this.uiServices.setError({
          title: 'Σφάλμα',
          description: err.error.message,
        });
      },
    });
  }

  onTeacherToDeleteModal(uuid: string) {
    this.toDeleteUuid.set(uuid);
    this.showModal.set(true);
  }

  onCancelDelete() {
    this.showModal.set(false);
  }

  onConfirmDelete() {
    this.uiServices.activateLoading();
    this.teacherService.deleteTeacher(this.toDeleteUuid()).subscribe({
      next: () => {
        this.uiServices.deactivateLoading();
        this.uiServices.clearError();
        this.showModal.set(false);

        this.uiServices.setSuccess({
          title: 'Ο εκπαιδευτής διαγράφηκε με επιτυχία.',
        });

        this.teacherService.getAll().subscribe({
          next: () => {
            this.uiServices.clearError();
          },
          error: (err) => {
            this.uiServices.setError({
              title: 'Σφάλμα',
              description: err.error.message,
            });
          },
        });
      },
    });
  }

  title = 'Μητρώο Εκπαιδευτών';
}
