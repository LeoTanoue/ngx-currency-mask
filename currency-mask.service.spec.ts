import { TestBed, inject } from '@angular/core/testing';

import { CurrencyMaskService } from './currency-mask.service';

describe('CurrencyMaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyMaskService]
    });
  });

  it('should be created', inject([CurrencyMaskService], (service: CurrencyMaskService) => {
    expect(service).toBeTruthy();
  }));
});
