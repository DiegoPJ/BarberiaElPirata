import { Component, OnChanges, SimpleChanges ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciales } from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    creds: Credenciales = {
    email:'',password:''
  }
	  isAuthenticated = false;

   error = false;
   user: boolean = !!localStorage.getItem('credencial');

  constructor(
    private userService:UserService,
    private router: Router,
    private authService: AuthService
  ) {}
    ngOnInit(): void {
// Suscribirse al evento de cambio de autenticación
    this.authService.authChange.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    }

  
  login(form: NgForm) {
    this.userService.login(this.creds).subscribe(
      response => {
		  this.user = !!localStorage.getItem('credencial');
      },
      error => {
        this.error = true;
      }
    );
  }
  logout(){
	  this.userService.logout();
	 // localStorage.removeItem('token');
	  localStorage.removeItem('credencial');
	  this.user = false;
  }
  onLogout() {
  this.user = false;
}
 clearError() {
        this.error = false;
    }
}