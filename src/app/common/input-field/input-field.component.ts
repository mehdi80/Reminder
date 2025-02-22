import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-input-field',
  imports: [
    MatFormField,
    MatLabel,
    MatIconModule,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatPrefix
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {

@Input() label: string='';
@Input() type: string = 'text';
@Input() icon!: string;
@Input() control!:FormControl;

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.hasError('required')) {
      return `${this.label} is required`;
    }
    if (this.control.hasError('minlength')) {
      return `${this.label} must be at least ${this.control.errors['minlength'].requiredLength} characters`;
    }
    if (this.control.hasError('maxlength')) {
      return `${this.label} cannot exceed ${this.control.errors['maxlength'].requiredLength} characters`;
    }
    if (this.control.hasError('email')) {
      return `Please enter a valid email address`;
    }
    if (this.control.hasError('pattern')) {
      return this.getPatternErrorMessage();
    }
    return '';
  }

  getPatternErrorMessage(): string {
    switch (this.label.toLowerCase()) {
      case 'password':
        return 'Must contain uppercase, lowercase, number, and special character';
      case 'phone number':
        return 'Please enter a valid phone number';
      case 'username':
        return 'Username can only contain letters and numbers';
      case 'age':
        return 'Age must be a number between 18 and 100';
      default:
        return 'Invalid format';
    }
  }

}
