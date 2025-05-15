import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInsertComponent } from './student-insert.component';

describe('StudentInsertComponent', () => {
  let component: StudentInsertComponent;
  let fixture: ComponentFixture<StudentInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
