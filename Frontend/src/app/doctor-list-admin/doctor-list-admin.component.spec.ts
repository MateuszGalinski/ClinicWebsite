import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListAdminComponent } from './doctor-list-admin.component';

describe('DoctorListAdminComponent', () => {
  let component: DoctorListAdminComponent;
  let fixture: ComponentFixture<DoctorListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
