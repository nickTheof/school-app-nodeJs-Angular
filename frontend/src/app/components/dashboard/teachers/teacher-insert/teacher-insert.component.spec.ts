import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInsertComponent } from './teacher-insert.component';

describe('TeacherInsertComponent', () => {
  let component: TeacherInsertComponent;
  let fixture: ComponentFixture<TeacherInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
