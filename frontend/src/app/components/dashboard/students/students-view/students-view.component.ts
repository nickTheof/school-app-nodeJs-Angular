import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PersonsViewComponent } from '../../../shared/persons-view/persons-view.component';
import { StudentService } from '../../../../shared/services/student.service';
import { UiServicesService } from '../../../../shared/services/ui-services.service';
import { DeletePersonModalComponent } from '../../../shared/delete-person-modal/delete-person-modal.component';
import { SuccessCardComponent } from '../../../shared/success-card/success-card.component';
import { Student, StudentView } from '../../../../shared/interfaces/student';

@Component({
  selector: 'app-students-view',
  imports: [
    PersonsViewComponent,
    DeletePersonModalComponent,
    SuccessCardComponent,
  ],
  templateUrl: './students-view.component.html',
  styleUrl: './students-view.component.css',
  host: {
    class: 'relative w-full',
  },
})
export class StudentsViewComponent implements OnInit {
  private studentService = inject(StudentService);
  private uiServices = inject(UiServicesService);

  showModal = signal<boolean>(false);
  toDeleteUuid = signal<string>('');

  private filteredStudents = signal<StudentView[]>([]);
  private isFiltering = signal<boolean>(false);

  studentsData = computed(() => {
    return this.isFiltering()
      ? this.filteredStudents()
      : this.studentService.studentsView();
  });

  showSuccessCard = this.uiServices.successExists;
  successMessage = this.uiServices.successMessage;

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(forceRefresh = false) {
    this.studentService.getAll(forceRefresh).subscribe();
  }

  onStudentToDeleteModal(uuid: string) {
    this.toDeleteUuid.set(uuid);
    this.showModal.set(true);
  }

  onCancelDelete() {
    this.showModal.set(false);
  }

  onConfirmDelete() {
    this.studentService.deleteStudent(this.toDeleteUuid()).subscribe({
      next: () => {
        this.showModal.set(false);
        this.uiServices.setSuccess({
          title: 'Ο εκπαιδευτής διαγράφηκε με επιτυχία.',
        });
        this.loadStudents(true);
      },
    });
  }

  onFilterCleared() {
    this.isFiltering.set(false);
    this.loadStudents(true);
  }

  onFilterSubmitted(filterObj: { firstname: string; lastname: string }) {
    this.studentService.getFiltered(filterObj).subscribe({
      next: (data) => {
        this.filteredStudents.set(data);
        this.isFiltering.set(true);
      },
    });
  }

  title = 'Μητρώο Μαθητών';
}
