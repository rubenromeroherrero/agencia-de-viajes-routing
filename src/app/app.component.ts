import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agencia-de-viajes-routing';

  constructor(private authService: AuthService, private router: Router) {}

  cerrarSesion() {
    this.authService.logOutUser();
    this.router.navigate(['login']);
  }
}
