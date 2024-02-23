import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderBoxComponent } from '../../common/order-box/order-box.component';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';


export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity_available: number;
  quantity_list: any[];
}

export interface OrderItem {
  id: number;
  userEmail: string;
  itemName: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ MatTabsModule, HttpClientModule, MatTableModule, CommonModule, MatCardModule, FormsModule, MatButtonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  infiniteNumbers: number[] = [];
  selectedItems: any[] = [];
  displayOrderBtn: boolean = false;


  displayedGroceryColumns: string[] = ['id', 'name', 'category', 'price', 'quantity_available'];
  displayedOrderColumns: string[] = ['id', 'email', 'name', 'price', 'quantity', 'totalPrice'];

  groceryItems: GroceryItem[] = [];
  orderItems: OrderItem[] = [];


  apiUrl: string = environment.userApiUrl;

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    /**
     * Fetch Items
     */
    this.refreshItems();

    /**
     * Fetch Orders
     */
    this.refreshOrders();
  }

  /**
   * Refresh Items
   */
  refreshItems(): void {
    this.fetchItems().subscribe(event => {
      if(event.status == 200) {
        this.groceryItems = event.response;
        for(const val of this.groceryItems) {
          val.quantity_list = Array.from({ length: val.quantity_available }, (_, i) => i + 1);
        }
      }
    });
  }

  /**
   * Refresh Orders
   */
  refreshOrders(): void {
    this.fetchOrders().subscribe(event => {
      if(event.status == 200) {
        this.orderItems = event.response;
      }
    });
  }

  /**
   * Fetch Items
   * @returns 
   */
  fetchItems(): Observable<any> {
    const data = this.httpClient.get<any>(this.apiUrl+'/fetchItems');
    return data;
  }
  /**
   * Fetch Orders
   * @returns 
   */
  fetchOrders(): Observable<any> {
    const data = this.httpClient.get<any>(this.apiUrl+'/fetchOrder');
    return data;
  }
  
  /**
   * Update Quantity
   * @param element 
   */
  onQuantityChange(element: any) {
    const index = this.selectedItems.findIndex(item => item.itemName === element.name);
    if (index === -1) {
      this.selectedItems.push({ itemName: element.name, quantity: element.quantity_available });
    } else {
      this.selectedItems[index].quantity = element.quantity_available;
    }
    if(this.selectedItems.length != 0) this.displayOrderBtn = true;
  }

  /**
   * Proceed with the Order
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(OrderBoxComponent, {
      width: '400px',
      data: { selectedItems: this.selectedItems, refreshGroceryItems: this.refreshItems.bind(this), refreshUserOrders: this.refreshOrders.bind(this) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
