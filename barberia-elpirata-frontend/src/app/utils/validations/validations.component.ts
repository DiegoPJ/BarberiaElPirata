import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent {

	  static existeEmail(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.comprobarEmail(control.value).pipe(
        map(res => {
          return res ? { 'noEmailValido': true } : null;
        })
      )
    };
  }
	static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }
    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}
static patternValidatorPassword(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }
    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? error : null;
  };
}
/*static imagenAceptada(userService : UserService){
		return(control :AbstractControl) => {
			const value = control.value;
			console.log(value);
			return userService.comprobarEmail(value)
			.pipe(
				map(response => {
					return response  ? {NoEmailValido : true} : null ;
				})
			)
		}
}
*/
 
}
