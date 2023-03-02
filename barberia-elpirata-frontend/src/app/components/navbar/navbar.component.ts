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
	@Output() logout = new EventEmitter<void>();
		  screenWidth: number;

  currentRoute: string = '';
   @Input() user: boolean;
  
  constructor(private router: Router,    private userService:UserService,private authService: AuthService
) { }

  ngOnInit(): void {
	   // Suscribirse al evento de cambio de autenticación
    this.authService.authChange.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
	  
	  
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
  this.userService.logout();
  localStorage.removeItem('credencial');
  this.user = false;
        this.logout.emit();

    if (this.currentRoute === '/cita' || this.currentRoute === '/carro') {
    // Redirigir a la página de inicio
    this.router.navigateByUrl('/');
  }
}
getScreenWidth(): number {
    return this.screenWidth;
  }

}







