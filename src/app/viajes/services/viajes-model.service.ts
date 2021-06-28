import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viaje } from '../models/viaje';
import { IdValor } from './id-valor';
import { map } from 'rxjs/operators';
import { ViajesFilter } from '../models/viajes-filter';

export interface ViajeDelete {
  destroyedRow: number
  delete: boolean,
  porque?: 'l.fdjafldskjflajflñasjflaksjfñlsdjfl'
}

@Injectable({
  providedIn: 'root'
})
export class ViajesModelService {

  private tiposDeViaje: IdValor[] = [
    { id: 1, valor: 'Familar' },
    { id: 2, valor: 'Trabajo' },
    { id: 3, valor: 'Luna De Miel' },
    { id: 4, valor: 'Ahora Mismo Por Favor' },
    { id: 5, valor: 'Aventura' },
    { id: 6, valor: 'Cultural' },
    { id: 7, valor: 'Luxury' },
    { id: 8, valor: 'Gastronomico' },
  ];

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getViajes(): Observable<Viaje[]> {

    return this.http.get<Viaje[]>(`${this.url}/viajes`).pipe(
      map(x => x.map(v => new Viaje(v)))
    );

  }

  getViajeById(id: string): Observable<Viaje> {

    return this.http.get<Viaje>(`${this.url}/viajes/${id}`).pipe(
      map(x => new Viaje(x))
    );

  }

  guardar(viaje: Viaje): Observable<Viaje | null> {

    if (!viaje) {
      return of(null);
    }

    if (viaje.id) {
      return this.http.put<Viaje>(`${this.url}/viajes/${viaje.id}`, viaje).pipe(
        map(x => new Viaje(x))
      );
    }

    return this.http.post<Viaje>(`${this.url}/viajes/`, viaje).pipe(
      map(x => new Viaje(x))
    );

  }

  eliminar(id: string): Observable<boolean | null> {


    if (id) {
      return this.http.delete<any>(`${this.url}/viajes/${id}`, { observe: 'response' }).pipe(
        // map(x => x.status === HttpStatusCode.Ok)); --> si le decimos en la api que nos devulva un status 200
        map(x => x.status === HttpStatusCode.NoContent));
    }

    return of(null);
  }

  buscar(filtro: ViajesFilter): Observable<Viaje[]> {
    const { nombre, destino, tipoDeViajeId } = filtro;

    let params = '';

    if (filtro?.tipoDeViajeId) {
      params = `tipoDeViajeId=${tipoDeViajeId}`;
    }

    if (filtro?.nombre) {
      params = params ? `${params}&nombre=${nombre}` : `nombre=${nombre}`;
    }

    if (filtro?.destino) {
      params = params ? `${params}&destino=${destino}` : `destino=${destino}`;
    }

    return this.http.get<Viaje[]>(`${this.url}/viajes/search?${params}`).pipe(
      map(x => x.map(v => new Viaje(v)))
    );

  }

  getTiposDeViajes(): IdValor[] {
    return this.tiposDeViaje;
  }

}
