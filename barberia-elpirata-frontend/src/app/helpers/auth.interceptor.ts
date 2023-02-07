import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
	  
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
	  const token = this.userService.getToken();
	  console.log("token: - "+ token);
	  if(token){
		  const cloned = request.clone({
			  headers: request.headers.set('Authorization',`Bearer ${token}`)
			  
	  })
	  console.log(cloned);
		return next.handle(cloned);
	}
	console.log("no tiene token")
    return next.handle(request);
  }
}
