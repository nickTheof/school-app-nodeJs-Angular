import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  studentsData: { uuid: string; firstname: string; lastname: string }[] = [];
}
