import { HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto';
import { Cart } from 'src/database/entities/cart.entity';
import { CartService } from 'src/database/services/cart.service';
import { GroceryItemsService } from 'src/database/services/grocery-items.service';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly cartService: CartService, private readonly groceryItemService: GroceryItemsService) {}

    /**
     * Function to fetch all items.
     * @returns 
     */
    async fetchAllItems(): Promise<ResponseDTO> {
        const data = await this.groceryItemService.findAll().catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        })

        return {
            status: HttpStatus.OK,
            response: data
        }
    }

    /**
     * Function to order items.
     * @param data 
     * @returns 
     */
    async orderItems(data: Partial<Cart>[]): Promise<ResponseDTO> {
        /**
         * Get the quantity from the payload and fetch quantity from tbl_grocery_items table and check if the quantity is valid.
         */
        for(const val of data) {
            const groceryItems = await this.groceryItemService.getQuantityByItem(val.itemName);
            if(groceryItems.length == 0) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: `Grocery Item ${val.itemName} is not available.`
                }
            }

            if(groceryItems[0].quantity_available == 0) {
                return {
                    status: HttpStatus.OK,
                    message: `Grocery Item ${val.itemName} is Out Of Stock.`
                }
            }

            if(groceryItems[0].quantity_available < val.quantity) {
                return {
                    status: HttpStatus.OK,
                    message: `Only ${groceryItems[0].quantity_available} ${val.itemName} is Available.Check the available quantity and Re-order.`
                }
            }

            /**
             * Insert Data to cart
             */
            val['price'] = groceryItems[0].price;
            val['totalPrice'] = val.quantity * groceryItems[0].price;

            await this.cartService.insert(val).catch(async error => {
                this.logger.error(`Something went Wrong! ${error}`);
                throw new InternalServerErrorException('Something went Wrong!');
            });

            /**
             * Update the quantity_available
             */
            await this.groceryItemService.update({ name: val.itemName, quantity_available: groceryItems[0].quantity_available - val.quantity }).catch(async error => {
                this.logger.error(`Something went Wrong! ${error}`);
                throw new InternalServerErrorException('Something went Wrong!');
            });
        }
        
        return {
            status: HttpStatus.OK,
            message: 'Grocery Items Ordered sucessfuly.'
        }
    }

    /**
     * Function to fetch orders.
     * @returns 
     */
    async fetchOrder(): Promise<ResponseDTO> {
        const data = await this.cartService.find().catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });

        return {
            status: HttpStatus.OK,
            response: data
        }
    }
}
