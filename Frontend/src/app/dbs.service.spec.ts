import { TestBed } from '@angular/core/testing';

import { DbsService } from './dbs.service';

describe('DbsService', () => {
  let service: DbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
