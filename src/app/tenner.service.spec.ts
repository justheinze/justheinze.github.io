import { TestBed } from '@angular/core/testing';

import { TennerService } from './tenner.service';

describe('TennerService', () => {
  let service: TennerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
