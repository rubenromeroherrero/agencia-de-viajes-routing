import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  email = 'admin@gmail.com';

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(values: {email:string, password:string}): void {
    if (values?.email && values?.password) {
      this.loginService.login(values).subscribe(usuario => {
        if (usuario) {
          // si todo va correcto --> pasamos el usuario al localStorage
          this.authService.storeUser(usuario);
          this.router.navigate(['']);
        } else {
          this.error = true;
        }
      })
    } else {
      // para que te muestre la etiqueta html p de error, en caso de que los datos introducidos sean incrorectos
      this.error = true;
    }
  }
}
