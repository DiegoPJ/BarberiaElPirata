import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
	 alertType: string;
  	alertMessage: string;
 	 alertIcon: string;
    showPopup: boolean = false;
	@ViewChild("alertDom") alertDom: ElementRef;


  show(type: string, message: string) {
	this.showPopup = true;
    this.alertType = type;
    this.alertMessage = message;

    if (type === 'success') {
      this.alertIcon = '../assets/img/success.png';

    } else {
      this.alertIcon = '../assets/img/error.png';
    }
  }
  closeAlert() {
    this.showPopup = false;
  }
}
