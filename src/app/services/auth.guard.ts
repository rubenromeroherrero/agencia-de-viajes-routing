import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  // clase que funciona como un servicio, a traves de interfaz
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // si hay un true, es decir usuario en el localStorage, le permitimos acceder a las rutas
    if (this.authService.isUserAuthenticated) {
      return true;
   }

    // en caso de que no sea correcto, volvemos a redirigir a la página de login
    return this.router.createUrlTree(['login']);
    // this.router.navigate(['login']);
    // return false;
  }
  
}
