import { TestBed } from '@angular/core/testing';

import { ClientesModelService } from './clientes-model.service';

describe('ClientesModelService', () => {
  let service: ClientesModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
