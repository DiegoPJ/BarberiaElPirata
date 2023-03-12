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
	roles: { rolId: number, nombre: string }[];
	citas: Cita[]
}	

export interface Horario {
	
	id:number;
	diaSemana:String;
	hora_apertura_manana:String;
	hora_cierre_manana:String;
	hora_apertura_tarde:String;
	hora_cierre_tarde:String;
}	

export interface Cita {
	
	id:number;
	nombre:string | null;
	fechaInicio:Date;
	fechaFin:Date;
	usuario:Usuario;
	corte:Corte[]
	estilo:Estilo[]
	servicio:Servicio[]
	precio:number
}

export interface Servicio {
	
	  id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
	  extra: string;
	  cortes: Corte[];
	  tiempo: number;
}

export interface Corte {
	
	 id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
	  extra: string;
	  	  tiempo: number;

	  servicio: Servicio;
	  
	  estilos: Estilo[];
}

export interface Estilo {
      corte: Corte;
	  id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
	  	  tiempo: number;

	  extra: string;
}

export interface Producto{
	id:number;
	cantidad:number;
	descripcion:string;
	imagen:string;
	nombre:string;
	precio:number;
}