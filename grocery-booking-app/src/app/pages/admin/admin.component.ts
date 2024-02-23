import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { UpdateDialogComponent } from '../../common/update-dialog/update-dialog.component';
import { AddDialogComponent } from '../../common/add-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity_available: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ MatIconModule, MatTableModule, MatTabsModule, HttpClientModule, MatButtonModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  apiUrl: string = environment.adminApiUrl;

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'quantity_available', 'actions'];
  groceryItems: GroceryItem[] = [];

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
    /**
     * Fetch Items
     */
    this.refreshData();
  }
  
  /**
   * Refresh Data
   */
  refreshData(): void {
    this.fetchItems().subscribe(event => {
      if(event.status == 200) {
        this.groceryItems = event.response;
      } else {
        this.snackBar.open(event.error.message, 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
  /**
   * Fetch Items
   * @returns 
  */
  fetchItems(): Observable<any> {
    const data = this.httpClient.get<any>(this.apiUrl+'/getItem');
    return data;
  }
  
  /**
   * Update grocery items
   * @param item 
   */
  editItem(item: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '250px',
      data: { id: item.id, name: item.name, category: item.category, price: item.price, quantity_available: item.quantity_available }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(result.name === '' || result.category === '' || result.price === '' || result.quantity_available === '') {
          this.snackBar.open("Cannot Update. Input Value is Empty!", 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          return;
        }

        if(result.price < 1 ||  result.quantity_available < 1) {
          this.snackBar.open("Invalid Input!", 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          return;
        }

        this.httpClient.put<any>(this.apiUrl+'/updateItem', result)
        .subscribe(response => {
          console.log('POST request successful:', response);
          this.refreshData();
        }, error => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          console.error('POST request failed:', error);
        });
      }
    });
  }

  /**
   * Add item
   */
  addItem(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: { name: '', category: '', price: '', quantity_available: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.price = Number(result.price);
        result.quantity_available = Number(result.quantity_available);
        this.httpClient.post<any>(this.apiUrl+'/addItem', result)
        .subscribe(response => {
          console.log('POST request successful:', response);
          this.refreshData();
        }, error => {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          console.error('POST request failed:', error);
        });
      }
    });
  }

  /**
   * Delete Item
   * @param name 
   * @returns 
   */
  deleteItem(name: string) {
    const url = `${this.apiUrl}/deleteItem/${name}`;
    this.httpClient.delete<any>(url).subscribe(event => {
      this.snackBar.open(event.message, 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.refreshData();
    });
  }
}
