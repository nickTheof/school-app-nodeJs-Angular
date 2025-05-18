import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PersonDetailsComponent } from '../../../shared/person-details/person-details.component';
import {
  StudentService,
  DEFAULT_STUDENT,
} from '../../../../shared/services/student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../../../../shared/interfaces/student';

@Component({
  selector: 'app-student-details',
  imports: [PersonDetailsComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private studentService = inject(StudentService);
  person = signal<Student>(DEFAULT_STUDENT);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (val: ParamMap) => {
        this.studentService
          .getStudentByUuid(val.get('studentId') || '')
          .subscribe({
            next: (resp) => {
              this.person.set(resp.data);
            },
          });
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  title = 'Στοιχεία Μαθητή';
}
