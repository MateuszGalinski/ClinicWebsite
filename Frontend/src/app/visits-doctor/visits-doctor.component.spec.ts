import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsDoctorComponent } from './visits-doctor.component';

describe('VisitsDoctorComponent', () => {
  let component: VisitsDoctorComponent;
  let fixture: ComponentFixture<VisitsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitsDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
