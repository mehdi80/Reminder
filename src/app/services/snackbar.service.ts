import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../common/snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private  snackBar: MatSnackBar) { }

  showMessage(message: string,type: 'success' | 'error' = 'success') {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 3000,
      panelClass: [],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
