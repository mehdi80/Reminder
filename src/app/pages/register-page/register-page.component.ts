import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {
  AbstractControl,
  FormControl, FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackbarService} from '../../services/snackbar.service';
import {CirclesComponent} from '../../common/circles/circles.component';
import {SocialLinksComponent} from '../../common/social-links/social-links.component';
import {InputFieldComponent} from '../../common/input-field/input-field.component';
import {ButtonComponent} from '../../common/button/button.component';
import {Router} from '@angular/router';

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
      confirmPass.setErrors({notMatching: true});
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
    MatSnackBarModule,
    CirclesComponent,
    SocialLinksComponent,
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackbar: SnackbarService,
    private router: Router,
  ) {
  }

  socialOptions = signal([
    {name: 'Facebook', icon: 'bxl-facebook', link: '#'},
    {name: 'Google', icon: 'bxl-google', link: '#'},
    {name: 'Instagram', icon: 'bxl-instagram', link: '#'}
  ])

  users: WritableSignal<User[]> = signal([]);
  isSubmitting: WritableSignal<boolean> = signal(false);

  form = new FormGroup(
    {
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
      ),

      rePassword: new FormControl('',
        [
          Validators.required,
          Validators.min(8)
        ]
      ),

      firstName: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
        ]
      ),

      lastName: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
        ]
      ),

      age: new FormControl('',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100)
        ]
      ),

      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]
      ),

      phoneNumber: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^09\d{9}$/)
        ]
      ),
    },
    {validators: matchPasswords('passwordFormControl', 'rePasswordFormControl')}
  );

  inputFields =signal( [
    {type: 'text ', control:this.form.controls['firstName'],label:'First Name',icon:''},
    {type: 'text', control:this.form.controls['lastName'],label:'Last Name',icon:''},
    {type: 'text', control:this.form.controls['age'],label:'Age',icon:'date_range'},
    {type: 'email', control:this.form.controls['email'],label:'Email',icon:'mail'},
    {type: 'text', control:this.form.controls['phoneNumber'],label:'Phone Number',icon:'add_call'},
    {type: 'text', control:this.form.controls['username'],label:'Username',icon:'account_circle'},
    {type: 'password', control:this.form.controls['password'],label:'Password',icon:'lock'},
    {type: 'password', control:this.form.controls['rePassword'],label:'Confirm Password',icon:'lock'},
  ])

  ngOnInit() {
    this.getUser();
  }

  getUser():void {
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
    })
  }

  register():void {
    const user: User = {
      username: this.form.value.username!,
      password: this.form.value.password!,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      age: this.form.value.age!,
      phone: this.form.value.phoneNumber!,
      email: this.form.value.email!
    }

    if (this.form.invalid) return;

    if (this.users().some(u => u.username === user.username)) {
      this._snackbar.showMessage('This username is already registered!', 'error');
      return;
    }

    if (this.users().some(u => u.email === user.email)) {
      this._snackbar.showMessage('This email has already been registered!', 'error');
      return;
    }

    this.isSubmitting.set(true);

    this.userService.register(user).subscribe(() => {
      this._snackbar.showMessage('Registration was successful!', 'success');
      this.isSubmitting.set(false);
      this.getUser();
      this.form.reset();
      this.router.navigate(['/login']);
    }, () => {
      this._snackbar.showMessage('This email has already been registered!', 'error');
      this.isSubmitting.set(false);
    });
  }
}
