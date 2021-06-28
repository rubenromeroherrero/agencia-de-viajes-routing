import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'agencia-de-viajes-routing';
  elUsuarioEstaEnLogin = false;
  
  constructor(private authService: AuthService, private router: Router) {
    // escuchamnos continuamente el cambio de rutas de la aplicación. Cuando estoy en página de login no muestro el compomente
    // this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((ev:any) => {
    //   this.elUsuarioEstaEnLogin = ev?.url.toLowerCase().includes('login');
    // })
  }

  cerrarSesion() {
    this.authService.logOutUser();
    this.router.navigate(['login']);
  }

  // devolvemos true en caso de que esté loggeado
  isUserLogged(): boolean {
    // comprobamos que haya usuario loggeado
    return this.authService.isUserAuthenticated;
  }
}
