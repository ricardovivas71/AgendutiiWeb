import { TestBed } from '@angular/core/testing';

import { AgendarService } from './agendar.service';

describe('AgendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendarService = TestBed.get(AgendarService);
    expect(service).toBeTruthy();
  });
});
