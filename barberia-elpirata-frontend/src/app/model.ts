export interface Credenciales {
	email: string;
	password: string;
}

export interface Usuario {
	
	id:number;
	nombre:String;
	email:String;
	telefono:String;
	password:String;
}	

export interface Horario {
	
	id:number;
	diaSemana:String;
	hora_apertura_mañana:String;
	hora_cierre_mañana:String;
	hora_apertura_tarde:String;
	hora_cierre_tarde:String;
}	

export interface Cita {
	
	id:number;
	fecha:Date;
	id_usuario:Usuario;
}

export interface Barberia {
	
	id:number;
	nombre:String;
	precio:number;
	suplemente:String;
}