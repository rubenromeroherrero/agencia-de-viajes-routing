import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
  
  
// SERVICIO QUE GUARDA UN USUARIO EN EL LOCAL STORAGE
export class AuthService {
  
  // le damos un nombre al usuario introducido en el localStorage
  private readonly APP_USER = 'APP_USER';

  constructor() { }

  storeUser(usuario: Usuario) {
    // guardamos el usuario loggeado en el localStorage como string
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
  }

  // devolverá booleano si hay un usuario en el localStorage
  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  logOutUser(): void {
    // nos cargamos del localStorage el usuario que hemos creado al logearnos
    localStorage.removeItem(this.APP_USER);
  }
}
