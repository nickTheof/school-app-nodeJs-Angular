import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInputFormControlComponent } from './person-input-form-control.component';

describe('PersonInputFormControlComponent', () => {
  let component: PersonInputFormControlComponent;
  let fixture: ComponentFixture<PersonInputFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonInputFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonInputFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
