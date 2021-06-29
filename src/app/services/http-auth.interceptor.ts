import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  readonly excludeUrls = ["login"];
  
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // EN EL CASO DE QUERER EXCLUIR MÄS DE UNA RUTA
    // En el caso de que cualquiera de las rutas, incluya una de las palabras del array excludeUrls, excluirá el bearer, y podrá acceder a esa ruta
    // como es el login, no necesitamos el bearer, sino no podemos entrar
    for (let index = 0; index < this.excludeUrls.length; index++) {
      if (request.url.toLowerCase().includes(this.excludeUrls[index])){
        return next.handle(request);
      } 
    }

    // EN EL CASO DE QUERER EXCLUIR UNA SOLA RUTA
    // if (request.url.toLowerCase().includes('login')) {
    //   return next.handle(request);
    // }

    // clone --> genera una nueva respuesta a partir de la original(request)
    // De esta manera nos aseguramos que vienen los headers de antes, más uno complementeario, que trae el bearer
    const newRequest = request.clone({headers: request.headers.set('Authorization', `bearer ${this.authService.bearer}`)})
    return next.handle(newRequest);

  }
}
