import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';


/**
 * Este servicio sabe cómo gestionar con la API si el usuario tiene acceso a la app
 */

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000/usuarios/login'
  constructor(private http: HttpClient) { }

  login(values: { email: string, password: string }): Observable<Usuario | null> {
    // <> -> lo que nos devuelve la api, un usuario
    return this.http.post<Usuario>(this.url, values, { observe: 'response' }).pipe(
      map(u => {
        return new Usuario(u.body)
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError){
            console.log('La api ha muerto');          
        }
        console.log(e.message);        
        return of(null);
      })
    );  
  }
}