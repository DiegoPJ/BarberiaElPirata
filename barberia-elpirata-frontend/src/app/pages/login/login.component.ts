import { Component } from '@angular/core';
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
	constructor(
		private userService:UserService,
		private router: Router
	) {
		
	}
	login (form: NgForm){
		console.log('form value' , form.value);
			this.userService.login(this.creds).subscribe(response => {
				this.router.navigate(['/']);
			})
				  console.log(this.userService.getToken())

		}
}
