import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsViewComponent } from './persons-view.component';

describe('PersonsViewComponent', () => {
  let component: PersonsViewComponent;
  let fixture: ComponentFixture<PersonsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
