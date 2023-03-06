import { Component, OnChanges, SimpleChanges ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credenciales } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
	creds: Credenciales = 
	{
    email:'',password:''
	}
	
	isAuthenticated = !!localStorage.getItem('credencial');

	error = false;

  constructor(
    private userService:UserService,
  	) {}
    ngOnInit(): void {
		
    }

  
  	login(form: NgForm) {
    this.userService.login(this.creds).subscribe(
      response => {
		  this.isAuthenticated = true;
      },
      error => {
        this.error = true;
      }
   	 );
 	 }

  	onLogout(event : any) {
	  this.isAuthenticated = event;

	}
 	clearError() {
        this.error = false;
    }
}