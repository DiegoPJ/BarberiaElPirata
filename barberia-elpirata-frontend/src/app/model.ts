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
	usuario:Usuario;
	corte:Corte[]
	estilo:Estilo[]
	servicio:Servicio[]
}

export interface Servicio {
	
	  id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
	  extra: string;
	  cortes: Corte[];
}

export interface Corte {
	
	 id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
	  extra: string;
	  servicio: Servicio;
	  estilos: Estilo[];
}

export interface Estilo {
      corte: Corte;
	  id: number;
	  nombre: string;
	  precio: number;
	  imagen: string;
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