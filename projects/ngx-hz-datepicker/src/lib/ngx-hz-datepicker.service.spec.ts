import { TestBed } from '@angular/core/testing';

import { NgxHzDatepickerService } from './ngx-hz-datepicker.service';

describe('NgxHzDatepickerService', () => {
  let service: NgxHzDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxHzDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
