import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl, FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function matchPasswords(password: string, rePassword: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const pass = formGroup.get(password)?.value;
    const confirmPass = formGroup.get(rePassword);

    if (confirmPass && pass !== confirmPass.value) {
      confirmPass.setErrors({ notMatching: true });
    } else {
      confirmPass?.setErrors(null);
    }

    return null;
  };
}

@Component({
  selector: 'app-register-page',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatIcon
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  constructor() {}

  form = new FormGroup(
    {
      usernameFormControl: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ),

      passwordFormControl: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!_])[A-Za-z\d@#$%^&*!_]{8,}$/)
        ]
      ),

      rePasswordFormControl: new FormControl('',
        [
          Validators.required,
          Validators.min(8)
        ]
      ),

      firstNameFormControl: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
        ]
      ),

      lastNameFormControl: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
        ]
      ),

      ageFormControl: new FormControl('',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100)
        ]
      ),

      emailFormControl: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]
      ),

      phoneNumberFormControl: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^09\d{9}$/)
        ]
      ),
    },
    {validators: matchPasswords('passwordFormControl', 'rePasswordFormControl')}
  );

  matcher = new MyErrorStateMatcher();
}
