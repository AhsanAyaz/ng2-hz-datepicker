import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHzDatepickerComponent } from './ngx-hz-datepicker.component';

describe('NgxHzDatepickerComponent', () => {
  let component: NgxHzDatepickerComponent;
  let fixture: ComponentFixture<NgxHzDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxHzDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxHzDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
