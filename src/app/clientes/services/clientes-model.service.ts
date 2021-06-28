import { HttpClient, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { ClienteListItem } from '../models/cliente-list-item';
import { IdValorClient } from './id-valor-client';

@Injectable({
  providedIn: 'root'
})
export class ClientesModelService {
  estadosCiviles: IdValorClient[] = [];
  // private estadosCiviles: IdValorClient[] = [
  //   { id: 1, descripcion: 'soltero' },
  //   { id: 2, descripcion: 'casado' },
  //   { id: 3, descripcion: 'viudo' },
  //   { id: 4, descripcion: 'divorciado' },
  //   {id: 99, descripcion: 'desconocido'}
  // ];

  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClienteListItem[]> {
    // pipe --> transofrmación de la api
    return this.http.get<ClienteListItem[]>(`${this.url}/clientes`).pipe(
      // a mi lista, por cada cliente que venga, le devuelvo un nuevo cliente
      map(clientes => clientes.map(x => {
        console.log(x);
        return new ClienteListItem(x)
      })));
    
  }

  getById(id: string): Observable<Cliente | null> {
    if (!id) {
      return of(null);
    }

    return this.http.get<Cliente>(`${this.url}/clientes/${id}`).pipe(
      map(cliente => new Cliente(cliente))
    );
  }

  // getEstadosCiviles(): IdValorClient[] {
  //   return this.estadosCiviles;
  // }

  getEstadosCiviles(): Observable<IdValorClient[]> {
    return this.http.get<IdValorClient[]>(`${this.url}/estadosCiviles`);
  }

  save(cliente: Cliente): Observable<Cliente | null> {
    console.log(cliente);
    if (!cliente) {
      // HACE QUE TE DEVUELLVA UN OBSERVABLE EL OF, de tipo null, porque no hay cliente
      return of(null);
    }


    return cliente?.id
      ? this.http.put<Cliente>(`${this.url}/clientes/${cliente.id}`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      )
      : this.http.post<Cliente>(`${this.url}/clientes/`, cliente).pipe(
        map(cliente => new Cliente(cliente))
      );
  }

  delete(clienteId: string): Observable<boolean> {
    return clienteId
      ? this.http.delete<HttpResponse<any>>(`${this.url}/clientes/${clienteId}`, { observe: 'response' }).pipe(
        map(res => res.status === HttpStatusCode.NoContent)
      )
      : of(false)
  }
}