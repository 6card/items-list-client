import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    
    if (control.value === '') {
      return null;
    }
    return !regexp.test(control.value) ? { 'patternInvalid': { regexp } } : null;
  };
}