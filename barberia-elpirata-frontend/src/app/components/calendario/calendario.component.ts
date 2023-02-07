import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
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

		for(let i = this.startDay(); i > 0; i--){
			this.dates.nativeElement.innerHTML += `<div class="calendar__item calendar__lastDays" style="opacity:.3">
			${this.getTotalDays(this.monthNumber-1)-(i-1)}
			</div>`;
			console.log(this.getTotalDays(this.monthNumber+1)-(i-1));
			console.log(this.startDay());
		}
		
		let esteMes = new Date().getMonth();
		for(let i = 1 ; i <= this.getTotalDays(month); i++){
			if(i === this.currentDay && this.monthNames[esteMes] == this.month.nativeElement.textContent){
				this.dates.nativeElement.innerHTML += `<div class="calendar__item calendar__today" 
				style="background-color: blue;
				color: white;
				width: 50%;
				border-radius: 50%;
				margin: auto;">${i}</div>`;
			}else{
				this.dates.nativeElement.innerHTML += `<div class="calendar__item">${i}</div>`;
			}
		}
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
		if(this.monthNumber !== 0){
			this.monthNumber--;
		}else{
			this.monthNumber = 11;
			this.currentYear--;
		}
		
		this.setNewDate();
	}
	nextMonth(){
		if(this.monthNumber !== 11){
			this.monthNumber++;
		}else{
			this.monthNumber = 0;
			this.currentYear++;
		}
				this.setNewDate();

	}
	setNewDate(){
		this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
		this.month.nativeElement.textContent = this.monthNames[this.monthNumber];
		this.year.nativeElement.textContent = this.currentYear.toString();
		
		this.dates.nativeElement.textContent = '';
		this.writeMonth(this.monthNumber);
	}
}



