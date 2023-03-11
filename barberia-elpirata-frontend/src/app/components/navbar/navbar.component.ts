import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  	isAuthenticated = false;
	@Output() logout = new EventEmitter<boolean>();
		  screenWidth: number;

  currentRoute: string = '';
   @Input() user: boolean;
 	  	userRoles: string[];
	credencial : any;
  constructor(private router: Router,    private userService:UserService,private authService: AuthService
) { }

  ngOnInit(): void {
	   const credencial = localStorage.getItem('credencial');
	 	 if (credencial) {
	    this.isAuthenticated = true;
	  	}
this.credencial = localStorage.getItem('credencial');
this.credencial = this.credencial.split('@')[0];	// Suscribirse al evento de cambio de autenticación
    this.authService.authChange.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    	    	 this.userRoles = this.authService.getUserRoles();


	  
    this.currentRoute = this.router.url;
	  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    
     this.screenWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });	
  }
onlogout(){
		this.isAuthenticated = false;
  		this.logout.emit(this.isAuthenticated);
	  	localStorage.removeItem('credencial');
	  	localStorage.removeItem('token');
	  	localStorage.removeItem('roles');
	  	this.userService.logout();
    	if (this.currentRoute != '/') {
    	// Redirigir a la página de inicio
    	this.router.navigateByUrl('/');
  }
}
getScreenWidth(): number {
    return this.screenWidth;
  }
   changeColor(event: any) {
    event.target.classList.toggle('active');
  }

}







