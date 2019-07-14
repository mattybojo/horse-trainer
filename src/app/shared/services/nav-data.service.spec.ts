import { TestBed } from '@angular/core/testing';

import { NavDataService } from './nav-data.service';

describe('NavDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavDataService = TestBed.get(NavDataService);
    expect(service).toBeTruthy();
  });
});
