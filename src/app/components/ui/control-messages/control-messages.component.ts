import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
   selector: 'app-control-messages',
   standalone: true,
   imports: [],
   templateUrl: './control-messages.component.html',
   styleUrl: './control-messages.component.scss'
})
export class ControlMessagesComponent {

// @Input() control: AbstractControl<string | number> | null = new FormControl();
   @Input() control: AbstractControl<string | number | number[] | string[]> | null = new FormControl();

   @Input() show = false;

   constructor() { }
   get errorMessage() {
      if (this.control == null) return null;

      for (let propertyName in this.control.errors) {
         if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.show)) {
            return this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
         }
      }
      return null;
   }

   getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      if (typeof validatorName == undefined) return '';

      let config: { [key: string]: string } = {
         '': '',
         'required': 'Complete el campo',
         'invalidCreditCard': 'Correo inválido',
         'email': 'Correo inválido',
         'invalidEmailAddress': 'Correo inválido',
         'invalidNumber': 'Numero inválido',
         'invalidOnlyLetter': 'Solo letras',
         'invalidPassword': 'Contraseña inválida. La contraseña debe tener al menos 6 caracteres de longitud, y contener un número.',
         'minlength': `Mínimo ${validatorValue.requiredLength} caracteres.`,
         'maxlength': `Máximo ${validatorValue.requiredLength} caracteres.`,
         'ngbDateInvalid': 'Fecha inválida.',
         'ngbDateMenor': 'Fecha inválida.'
      };

      if (validatorName == 'ngbDate') {
         validatorName = 'ngbDateInvalid';
         if (typeof validatorValue.requiredAfter != "undefined") {
            validatorName = 'ngbDateMenor';
            config['ngbDateMenor'] = `Fecha igual o anterior a ${validatorValue.requiredAfter.year}/${validatorValue.requiredAfter.month}/${validatorValue.requiredAfter.day}.`;
         }
      }

      return config[validatorName];
   }
}
