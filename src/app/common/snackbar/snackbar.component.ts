import {Component, Inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [
    NgClass,
    MatButton
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {}

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
