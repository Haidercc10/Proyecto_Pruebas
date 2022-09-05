/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistenciaUsuarioService } from './AsistenciaUsuario.service';

describe('Service: AsistenciaUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistenciaUsuarioService]
    });
  });

  it('should ...', inject([AsistenciaUsuarioService], (service: AsistenciaUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
