import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MyErrorStateMatcher} from '../register-page/register-page.component';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';
import {SnackbarService} from '../../services/snackbar.service';

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
  providers: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loading:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackbar:SnackbarService
  ) {}

  login: FormGroup = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!_])[A-Za-z\d@#$%^&*!_]{8,}$/)
      ]
    )
  });

  onSubmit():void {
    if (this.login.valid) {
      this.loading = true;
      const{username, password} = this.login.value;
      this.authService.login(username, password).subscribe(
        success => {
          this.loading = false;
          if (success) {
            this.router.navigateByUrl('/dashboard');
          }else {
            this._snackbar.showMessage('The username or password is incorrect!', 'error')
          }
        },error => {
          this.loading = false;
          console.log(error);
          this._snackbar.showMessage('Something went wrong!', 'error');
        }
      )
    }
  }

  matcher = new MyErrorStateMatcher();
}
