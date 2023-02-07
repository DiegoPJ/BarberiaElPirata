import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListaPreciosComponent } from './components/lista-precios/lista-precios.component';
import { ValidationsComponent } from './utils/validations/validations.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';


const appRoutes:Routes =[
	
	{
		path:'',
		 component:InicioComponent,
		 canActivate:[AuthGuard]
	},
	{
		path:'login',
		 component:LoginComponent
	}
]

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    SignupComponent,
    LoginComponent,
    ListaPreciosComponent,
    ValidationsComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
 		{
		  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
