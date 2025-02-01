import { Component } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {fakeBackendProvider} from '../../helper/_helper';
import {JwtInterceptor} from '../../helper/Jwt.Interceptor';
import {ErrorInterceptor} from '../../helper/error.Interceptor';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MyErrorStateMatcher} from '../register-page/register-page.component';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {


  usernameFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(6)]);
  matcher = new MyErrorStateMatcher();
}
