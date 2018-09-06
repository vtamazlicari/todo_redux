import { TestBed, inject } from '@angular/core/testing';

import { BkService } from './bk.service';

describe('BkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BkService]
    });
  });

  it('should be created', inject([BkService], (service: BkService) => {
    expect(service).toBeTruthy();
  }));
});
