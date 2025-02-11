import {Component, OnInit} from '@angular/core';
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
import {UserService} from '../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/User';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackbarService} from '../../services/snackbar.service';

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
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatIcon,
    MatSnackBarModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackbar: SnackbarService
  ) {
  }

  users!: User[];
  usernameExists: boolean = false;
  emailExists: boolean = false;
  matcher = new MyErrorStateMatcher();
  isSubmitting = new BehaviorSubject<boolean>(false);

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

  ngOnInit() {
    this.getUser();

    this.form.get('username')?.valueChanges.subscribe(value => {
      if (this.users.some(user => user.username === value)) {
        this._snackbar.showMessage('This username is already registered!', 'error')
      }
    });

    this.form.get('email')?.valueChanges.subscribe(value => {
      if (this.users.some(user => user.email === value)) {
        this._snackbar.showMessage('This email has already been registered!', 'error')
      }
    });
  }

  getUser() {
    return this.userService.getUsers().subscribe(user => {
      this.users = user;
    })
  }

  register() {
    if (this.form.invalid || this.emailExists || this.usernameExists) return;

    const user: User = {
      username: this.form.value.username!,
      password: this.form.value.password!,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      age: this.form.value.age!,
      phone: this.form.value.phoneNumber!,
      email: this.form.value.email!
    }

    if (this.users.some(u => u.username === user.username)) {
      this._snackbar.showMessage('This username is already registered!', 'error')

      return;
    }

    if (this.users.some(u => u.email === user.email)) {
      this._snackbar.showMessage('This email has already been registered!', 'error')
      return;
    }

    this.isSubmitting.next(true);

    this.userService.register(user).subscribe(() => {
      this._snackbar.showMessage('Registration was successful!', 'success')

      this.getUser();
      this.isSubmitting.next(false);
      this.form.reset();
    }, () => {
      this._snackbar.showMessage('This email has already been registered!', 'error')

      this.isSubmitting.next(false);
    })
  }
}
