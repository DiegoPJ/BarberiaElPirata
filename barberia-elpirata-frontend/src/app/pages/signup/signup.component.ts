import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidationsComponent } from 'src/app/utils/validations/validations.component';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	formSubmit: any;
	errores : boolean;
	constructor(
			private _builder: FormBuilder,private userService:UserService

	) {

		this.formSubmit = this._builder.group({
			nombre: ['', [Validators.required, Validators.minLength(3)]],
			username: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
			email: ['', Validators.compose([Validators.email, Validators.required]),ValidationsComponent.existeEmail(this.userService)],
			telefono: ['', [Validators.required, Validators.minLength(9),Validators.pattern("^[0-9]*$")]],
			contraseña: [ '', Validators.compose([
         	Validators.required,
         	ValidationsComponent.patternValidator(/\d/, { hasNumber: true }),
         	ValidationsComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         	ValidationsComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
         	ValidationsComponent.patternValidatorPassword((/(?=.*[$@^!%*?&])/), { hasSpecialCharacters: true }),
         	Validators.minLength(8)])],
			repiteContraseña: ['', Validators.required],
			//foto: ['', Validators.required]

		})
	}
	
	registrarse(){
		
		if(this.formSubmit.get('nombre').errors || this.formSubmit.get('email').errors
		|| this.formSubmit.get('telefono').errors || this.formSubmit.get('contraseña').errors || this.formSubmit.get('repiteContraseña').errors
		 ){
			this.errores = true;
						console.log("nombre");
						console.log(this.formSubmit.get('nombre').errors);
						console.log("emnail");
						console.log(this.formSubmit.get('email').errors);
						console.log("tlf");
						console.log(this.formSubmit.get('telefono').errors);
						console.log("contrase");
						console.log(this.formSubmit.get('contraseña').errors);
						console.log("repite contra");
						console.log(this.formSubmit.get('repiteContraseña').errors);
						
		}else{
			console.log("a");
						this.errores = false;
						
				this.userService.añadirUsuario(this.formSubmit.value).subscribe(
			(data) => {
				console.log("usuario guardado")
			},(error) => {
				console.log(error);
			}
			
		)
		}
		
		
	}
	enviar(values: FormGroup) {
		console.log(values);
	}
	limpiar(){
		this.formSubmit.reset();
					this.errores = false;
	}
	

}



