import { TestBed, inject } from '@angular/core/testing';

import { FormLifeCycleService } from './form-life-cycle.service';

describe('FormLifeCycleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormLifeCycleService]
    });
  });

  it('should be created', inject([FormLifeCycleService], (service: FormLifeCycleService) => {
    expect(service).toBeTruthy();
  }));
});
