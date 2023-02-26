import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciales } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    creds: Credenciales = {
    email:'',password:''
  }
  
   error = false;
   user: boolean = !!localStorage.getItem('credencial');

  constructor(
    private userService:UserService,
    private router: Router
  ) {}

  
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
}