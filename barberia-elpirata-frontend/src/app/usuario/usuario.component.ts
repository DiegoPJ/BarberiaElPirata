import { Component } from '@angular/core';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
	
	id:number;
	nombre:String;
	email:String;
	telefono:String;
	perfil:String;
	password:String;
	
	
	constructor(){	
	}
}
