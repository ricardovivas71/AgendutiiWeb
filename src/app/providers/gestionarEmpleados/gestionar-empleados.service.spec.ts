import { TestBed } from '@angular/core/testing';

import { GestionarEmpleadosService } from './gestionar-empleados.service';

describe('GestionarEmpleadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionarEmpleadosService = TestBed.get(GestionarEmpleadosService);
    expect(service).toBeTruthy();
  });
});
