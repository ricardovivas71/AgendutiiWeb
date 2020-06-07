import { TestBed } from '@angular/core/testing';

import { GestionarEstablecimientoService } from './gestionar-establecimiento.service';

describe('GestionarEstablecimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionarEstablecimientoService = TestBed.get(GestionarEstablecimientoService);
    expect(service).toBeTruthy();
  });
});
