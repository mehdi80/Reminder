import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
  usernameFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  rePasswordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  firstNameFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  lastNameFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  ageFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  phoneNumberFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  matcher = new MyErrorStateMatcher();
}
