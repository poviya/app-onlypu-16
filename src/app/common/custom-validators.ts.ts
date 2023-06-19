// import { ConfiguracionPersonasService } from './../../../servicios/configuracion-personas.service';
import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value < 18 || control.value > 39) {
    return { age: true };
  }
  return null;
}

export function PricePostValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value < 1 || control.value > 99) {
    return { age: true };
  }
  return null;
}

 // Number only validation
 export function NumericValidator(control: AbstractControl) {
  let val = control.value;

  if (val === null || val === '') return null;

  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  return null;
}

export function pricePrimary(control: AbstractControl) {
  let val = control.value;

  if (val === null || val === '') return null;

  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  if(val > 0 && val < 5 ) return {'InvalidNumber': true}
  if(val > 99 ) return {'InvalidNumber': true}
  return null;
}

export function buyCredit(control: AbstractControl) {
  let val = control.value;

  if (val === null || val === '') return null;

  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  if(val <  0) return {'InvalidNumber': true}
  if(val ==  0) return {'InvalidNumber': true}
  if(val > 0 && val < 0.99 ) return {'InvalidNumber': true}
  if(val > 1 && val < 5 ) return {'InvalidNumber': true}
  if(val > 99 ) return {'InvalidNumber': true}
  return null;
}

export function NumeriDiscount(control: AbstractControl) {
  let val = control.value;

  if (val === null || val === '') return null;

  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  if(val < 0 && val > 99) return {'InvalidNumber': true}
  return null;
}

export function NumericValidatorTip(control: AbstractControl) {
  let val = control.value;

  if (val === null || val === '') return null;

  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

  if(val < 0.5 ) return {'InvalidNumber': true}
  if(val > 99 ) return {'InvalidNumber': true}
  return null;
}

export function MatchValidator(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);
    console.log(sourceCtrl)
    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
      ? { mismatch: true }
      : null;
  };
}

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function UrlValidator(control: AbstractControl): ValidationErrors | null {
    let str = control.value;
    if(!str)
    return { 'invalidUrl': true };
    if (!str.toString().match(/^https:\/*(?:\w+(?::\w+)?@)?[^\s\/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-\/]*)?$/)) return { 'invalidUrl': true };
    return null;
}
/*
export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
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

  static confirmarPassword(control: AbstractControl) {
    const password: string = control.get('password').value; // obtener password del formulario
    const confirmar_password: string = control.get('confirmar_password').value; // obtener confirmar_password
    // comparar la contraseña
    if (password !== confirmar_password) {
      // si no coinciden, configure un error en nuestro control de formulario confirmar_password
      control.get('confirmar_password').setErrors({ NoPassswordMatch: true });
    }
  }
  static confirmarEmail(control: AbstractControl) {
    const email: string = control.get('email').value; // obtener password del formulario
    const confirmar_email: string = control.get('confirmar_email').value; // obtener confirmar_password
    // comparar la contraseña
    if (email !== confirmar_email) {
      // si no coinciden, configure un error en nuestro control de formulario confirmar_password
      control.get('confirmar_email').setErrors({ NoEmailMatch: true });
    }
  }
  static verificarAlias(control: AbstractControl) {
    const alias: string = control.get('alias').value; // obtener password del formulario
    // comparar la contraseña
    if (alias === 'hola') {
      // si no coinciden, configure un error en nuestro control de formulario confirmar_password
      control.get('alias').setErrors({ AliasExiste: true });
    }
  }
  static duracionVerificar(control: AbstractControl) {
    const duracion: number = control.get('duracion').value; // obtener duracion del formulario
    // comparar la contraseña
    if (duracion < 1 || duracion > 60) {
      // si esta fuera del rango, configure un error en nuestro control de formulario 
      control.get('duracion').setErrors({ DuracionRango: true });
    }
  }
}
*/