import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],

})
export class CalendarioComponent {


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
    eventClickHandler: (event: any) => void;
	@Output() calendarioSeleccionado = new EventEmitter<Date | null>();
  	@ViewChild(AlertComponent) alert: AlertComponent;
	@ViewChild('prueba') prueba: ElementRef;

constructor(	
	
){
	this.currentDate = new Date();
	this.currentDay = this.currentDate.getDate();
	this.monthNumber = this.currentDate.getMonth();
	this.currentYear = this.currentDate.getFullYear();
	

}
    ngAfterViewInit(): void {
		this.month.nativeElement.textContent = this.monthNames[this.monthNumber];
		this.year.nativeElement.textContent = this.currentYear.toString();
		this.prev.nativeElement.addEventListener('click',()=>this.lastMonth());
		this.next.nativeElement.addEventListener('click',()=>this.nextMonth());
		this.writeMonth(this.monthNumber);
    }

    ngOnInit(): void {

    }
    

     writeMonth(month:any){
		  let fechaActual = new Date();
 
		
		console.log("fechaActual : " + fechaActual.getMonth());
		console.log("this.getTotalDays(month) : " + this.monthNumber);

		for(let i = this.startDay(); i > 0; i--){
			
			let div = document.createElement('div');
		div.classList.add('calendar__item', 'calendar__lastDays');
		//div.setAttribute("style","opacity:.2")
		div.textContent = (this.getTotalDays(this.monthNumber-1)-(i-1)).toString();
		this.dates.nativeElement.appendChild(div);
			
		}
			

		for(let i = 1 ; i <= this.getTotalDays(month); i++){
			if(fechaActual.getMonth() == this.monthNumber){
				if((i>=fechaActual.getDate())  ){
				let e = document.createElement('div');
				e.classList.add("calendar__item");
				e.textContent = i+"";
				this.dates.nativeElement.appendChild(e);

				}else{
					let e = document.createElement('div');
					e.classList.add('calendar__item', 'calendar__lastDays');
					e.textContent = i+"";
					this.dates.nativeElement.appendChild(e);
				}
			}else{
				let e = document.createElement('div');
					e.classList.add('calendar__item');
					e.textContent = i+"";
					this.dates.nativeElement.appendChild(e);
			}
			
			}
			
		  for (let i = 1; i <= 42 - this.getTotalDays(month) - this.startDay(); i++) {
		    let dayHtml = document.createElement("div");
			dayHtml.classList.add('calendar__item', 'calendar__startDays');
		    dayHtml.textContent = i + "";
		    this.dates.nativeElement.appendChild(dayHtml);

		 }
		  let buttons2 = document.querySelectorAll(".calendar__item");
					buttons2.forEach(button =>{
						if (!button.classList.contains("calendar__lastDays") &&
					!button.classList.contains("calendar__startDays")){
						
						 button.addEventListener("click",_ =>{
					    buttons2.forEach(button =>{
					      button.classList.remove("selected");
					    })
					    button.classList.toggle("selected");
					  })
					}
				})
					
			this.dates.nativeElement.removeEventListener('click', this.eventClickHandler);
			this.eventClickHandler = (event:any) => {
				if (!event.target.classList.contains("calendar__lastDays") &&
					!event.target.classList.contains("calendar__startDays")) {
						if (event.target.classList.contains("calendar__item")) {
						
					let fecha = new Date(this.currentYear, this.monthNumber, event.target.textContent);
					
					this.calendarioSeleccionado.emit(fecha);
					}
				}
			};
			this.dates.nativeElement.addEventListener('click', this.eventClickHandler);
	}
	
	 
	
  
	getTotalDays(month:any){
		if(month === -1) month = 11;
		
		if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9	|| month == 11){
			return 31;
		}else if(month == 3 || month == 5 || month == 8 || month == 10){
			return 30;
		}else{
			return this.isLeap() ? 29 : 28;
		}
	}
	isLeap(){
		return ((this.currentYear % 100 !==0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 == 0));
	}
	startDay(){
		let start = new Date(this.currentYear, this.monthNumber, 1);
		return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
	}
	
	 
  	
	lastMonth(){
		
		 let fechaActual = new Date();
  
		
	  if (fechaActual.getTime() > this.currentDate.getTime()) {
		     this.alert.show('error', 'No puedes coger citas anteriores');
	   		this.monthNumber = fechaActual.getMonth()+1;
	  }
	  console.log(fechaActual.getTime())
			  console.log(this.currentDate.getTime())

		
		if(this.monthNumber !== 0){
			this.monthNumber--;
		}else{
			this.monthNumber = 11;
			this.currentYear--;
		}
		
		this.setNewDate();
		this.calendarioSeleccionado.emit(null);
	}
	nextMonth(){
		
		 let fechaActual = new Date();
 		 let tresMesesDespues = new Date(this.currentYear, this.monthNumber-3,this.currentDay);
		
	  if (fechaActual.getTime() < tresMesesDespues.getTime()) {
		    this.alert.show('error', 'No puedes coger citas de mas de 5 meses');
	   		this.monthNumber--;
	  }
	  
		if(this.monthNumber !== 11){
			this.monthNumber++;
			
		}else{
			this.monthNumber = 0;
			this.currentYear++;
		}

				this.setNewDate();
		this.calendarioSeleccionado.emit(null);

	}
	setNewDate(){
		this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
		this.month.nativeElement.textContent = this.monthNames[this.monthNumber];
		this.year.nativeElement.textContent = this.currentYear.toString();
		
		this.dates.nativeElement.textContent = '';
		this.writeMonth(this.monthNumber);
	}
	
	agregarClase(prueba : ElementRef){
		prueba.nativeElement.classList.add('prueba2');
	}
}



