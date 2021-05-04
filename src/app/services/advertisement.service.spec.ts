import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AdvertisementService } from './advertisement.service';

describe('AdvertisementService', () => {
  let service: AdvertisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AdvertisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
