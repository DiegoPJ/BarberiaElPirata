import { Component, OnChanges, SimpleChanges ,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/components/alert/alert.component';
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
	emailOlvido : string;
	isAuthenticated = !!localStorage.getItem('credencial');

	error = false;
	formOlvido: FormGroup;
		@ViewChild(AlertComponent) alert: AlertComponent;


  constructor(
    private userService:UserService,
  	) {}
    ngOnInit(): void {
		this.formOlvido = new FormGroup({
		emailOlvido: new FormControl(null, [Validators.required,Validators.email])
		/*  this.myForm = new FormGroup({
      'inputField': new FormControl(null, Validators.required)
    });*/
	});
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
	enviarEmail() {

		console.log("weeee "+this.formOlvido.value.emailOlvido)
    this.userService.enviarEmailReinicioContrasena(this.formOlvido.value.emailOlvido).subscribe(
      respuesta => {
		  this.alert.show('success', 'Se ha enviado un correo de recuperación de contraseña');
        console.log(respuesta);
      },
      error => {
		  this.alert.show('error', 'Ha habido algun error al enviar el correo, revise si está bien escrito');

        console.log(error);
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