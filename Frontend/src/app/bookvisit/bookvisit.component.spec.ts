import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookvisitComponent } from './bookvisit.component';

describe('BookvisitComponent', () => {
  let component: BookvisitComponent;
  let fixture: ComponentFixture<BookvisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookvisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
