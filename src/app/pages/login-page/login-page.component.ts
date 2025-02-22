import {Component, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from '../register-page/register-page.component';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service/auth.service';
import {SnackbarService} from '../../services/snackbar.service';
import {SocialLinksComponent} from '../../common/social-links/social-links.component';
import {CirclesComponent} from '../../common/circles/circles.component';
import {ButtonComponent} from '../../common/button/button.component';
import {InputFieldComponent} from "../../common/input-field/input-field.component";


@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SocialLinksComponent,
    CirclesComponent,
    ButtonComponent,
    InputFieldComponent,
  ],
  providers: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loading: WritableSignal<boolean> = signal(false);


  socialOptions = signal([
    {name: 'Facebook', icon: 'bxl-facebook', link: '#'},
    {name: 'Google', icon: 'bxl-google', link: '#'},
    {name: 'Instagram', icon: 'bxl-instagram', link: '#'}
  ])

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackbar: SnackbarService
  ) {
  }

  login = new FormGroup({
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

  inputFields = [
    {type: 'text', control: this.login.controls['username'], label: 'Username', icon: 'account_circle'},
    {type: 'password', control: this.login.controls['password'], label: 'Password', icon: 'lock'},
  ]

  onSubmit(): void {
    if (this.login.valid) {
      this.loading.set(true);
      const {username, password} = this.login.value;
      this.authService.login(username, password).subscribe(
        success => {
          this.loading.set(false);
          if (success) {
            this.router.navigateByUrl('/dashboard');
          } else {
            this._snackbar.showMessage('The username or password is incorrect!', 'error')
          }
        }, error => {
          if (error.error) {
            this.loading.set(false);
            this._snackbar.showMessage('Something went wrong!', 'error');
          }
        }
      )
    }
  }
}
