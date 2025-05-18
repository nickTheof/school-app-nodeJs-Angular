import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonUpdateComponent } from '../../../shared/person-update/person-update.component';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  StudentService,
  DEFAULT_STUDENT,
} from '../../../../shared/services/student.service';
import { UiServicesService } from '../../../../shared/services/ui-services.service';
import {
  Student,
  StudentUpdateDTO,
} from '../../../../shared/interfaces/student';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [PersonUpdateComponent, ReactiveFormsModule],
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.css',
})
export class StudentUpdateComponent implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private studentService = inject(StudentService);
  private uiServices = inject(UiServicesService);
  person = signal<Student>(DEFAULT_STUDENT);
  formReady = false;

  form: FormGroup = new FormGroup({});

  formTitle = 'Ενημέρωση Στοιχείων Μαθητή';

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (val: ParamMap) => {
        const uuid = val.get('studentId') || '';
        this.studentService.getStudentByUuid(uuid).subscribe({
          next: (resp) => {
            this.person.set(resp.data);
            this.buildForm();
          },
        });
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  buildForm() {
    const p = this.person();

    this.form = new FormGroup({
      firstname: new FormControl(p.firstname, Validators.required),
      lastname: new FormControl(p.lastname, Validators.required),
      vat: new FormControl(p.vat, [
        Validators.required,
        Validators.pattern('^\\d{9}$'),
      ]),
      fathername: new FormControl(p.fathername, Validators.required),
      phoneNum: new FormControl(p.phoneNum, [
        Validators.required,
        Validators.pattern('^\\d{10,13}$'),
      ]),
      email: new FormControl(p.email, [Validators.required, Validators.email]),
      address: new FormControl(p.address, Validators.required),
      streetNum: new FormControl(p.streetNum, [
        Validators.required,
        Validators.pattern('^\\d{1,5}[A-Z]{0,2}$'),
      ]),
      zipcode: new FormControl(p.zipcode, [
        Validators.required,
        Validators.pattern('^\\d{5,}$'),
      ]),
      city: new FormControl<string>(p.city, Validators.required),
    });
    this.formReady = true;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.uiServices.setError({
        title: 'Σφάλμα!',
        description: 'Συμπληρώστε σωστά όλα τα πεδία της φόρμας.',
      });
      return;
    }

    const studentToUpdate: StudentUpdateDTO = this.getStudentUpdateDTO();

    this.studentService
      .updateStudent(this.person().uuid, studentToUpdate)
      .subscribe({
        next: () => {
          this.router.navigate(
            ['/dashboard', 'students', 'student', this.person().uuid],
            {
              replaceUrl: true,
            }
          );
        },
        error: () => {
          this.form.reset();
        },
      });
  }

  onClickBackwards() {
    this.location.back();
  }

  private getStudentUpdateDTO(): StudentUpdateDTO {
    return {
      firstname: this.form.value.firstname || '',
      lastname: this.form.value.lastname || '',
      vat: this.form.value.vat || '',
      fathername: this.form.value.fathername || '',
      phoneNum: this.form.value.phoneNum || '',
      email: this.form.value.email || '',
      zipcode: this.form.value.zipcode || '',
      address: this.form.value.address || '',
      streetNum: this.form.value.streetNum || '',
      city: this.form.value.city || '',
    };
  }
}
