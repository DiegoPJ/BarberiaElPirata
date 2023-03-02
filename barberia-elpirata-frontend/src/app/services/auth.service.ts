import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authChange = new EventEmitter<boolean>();

  login() {
    // Lógica para iniciar sesión
    this.isAuthenticated = true;
    this.authChange.emit(true);
  }

  logout() {
    // Lógica para cerrar sesión
    this.isAuthenticated = false;
    this.authChange.emit(false);
  }
}
