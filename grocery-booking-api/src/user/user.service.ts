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
        const id = await this.cartService.insert(data).catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });
        
        if(id) {
            return {
                status: HttpStatus.OK,
                message: 'Grocery Items Ordered sucessfuly.'
            }
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
