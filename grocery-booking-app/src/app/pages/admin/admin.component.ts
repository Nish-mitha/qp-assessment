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
import { environment } from '../../../environments/environment.development';

export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
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

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'actions'];
  groceryItems: GroceryItem[] = [];

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
    /**
     * Fetch Items
     */
    this.fetchItems().subscribe(event => {
      if(event.status == 200) {
        this.groceryItems = event.response;
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
      data: { id: item.id, name: item.name, category: item.category, price: item.price }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClient.put<any>(this.apiUrl+'/updateItem', result)
        .subscribe(response => {
          console.log('POST request successful:', response);
          window.location.reload();
        }, error => {
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
      data: { name: '', category: '', price: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.price = Number(result.price);
        this.httpClient.post<any>(this.apiUrl+'/addItem', result)
        .subscribe(response => {
          console.log('POST request successful:', response);
          window.location.reload();
        }, error => {
          if(error.error.statusCode == 409) {
                this.snackBar.open(error.error.message, 'Close', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });
          }
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
      window.location.reload();
    });
  }
}
