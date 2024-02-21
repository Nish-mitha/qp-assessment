import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-order-box',
  standalone: true,
  imports: [FormsModule, MatDialogActions, MatDialogContent, CommonModule, MatFormField, MatFormFieldModule, MatInputModule, MatButtonModule, HttpClientModule ],
  templateUrl: './order-box.component.html',
  styleUrl: './order-box.component.scss'
})
export class OrderBoxComponent {
  email: string = '';
  selectedItems: any[] = [];
  apiUrl: string = environment.userApiUrl;

  constructor(public dialogRef: MatDialogRef<OrderBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private http: HttpClient) {
      this.selectedItems = data.selectedItems;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onProceed(): void {
    if (!this.email.trim()) {

      this.snackBar.open('Email is required', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

    } else {

      this.selectedItems.forEach(item => {
        item.userEmail = this.email;
      });


      this.http.post<any>(this.apiUrl+'/orderItems', this.selectedItems)
        .subscribe(response => {
          console.log('POST request successful:', response);
          window.location.reload();
        }, error => {
          console.error('POST request failed:', error);
        });
    }
    this.dialogRef.close();
  }
}