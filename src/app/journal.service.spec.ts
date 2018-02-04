import { TestBed, inject } from '@angular/core/testing';

import { JournalService } from './journal.service';

describe('JournalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JournalService]
    });
  });

  it('should be created', inject([JournalService], (service: JournalService) => {
    expect(service).toBeTruthy();
  }));
});
