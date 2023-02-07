import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit,AfterViewInit{
	
	usuarios?: Usuario[];
	monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre',
	'Octubre','Noviembre','Diciembre'];
	currentDate:Date;
	currentDay:any;
    monthNumber: any;
    currentYear: any;
	@ViewChild('year') year: ElementRef;
	@ViewChild('month') month: ElementRef;
	@ViewChild('dates') dates: ElementRef;
	@ViewChild('prevMonthDOM') prev: ElementRef;
	@ViewChild('nextMonthDOM') next: ElementRef;


constructor(	
	private userService:UserService,
	
){
	this.currentDate = new Date();
	this.currentDay = this.currentDate.getDate();
	this.monthNumber = this.currentDate.getMonth();
	this.currentYear = this.currentDate.getFullYear();
	
}
    ngAfterViewInit(): void {
		this.month.nativeElement.textContent = this.monthNames[this.monthNumber];
		this.year.nativeElement.textContent = this.currentYear.toString();


    }
    ngOnInit(): void {

	/*this.userService.todosLosUsuarios()
	.subscribe(usuarios => {
		this.usuarios = usuarios;
	})
	console.log(localStorage.getItem("credencial"))*/

    }
}

