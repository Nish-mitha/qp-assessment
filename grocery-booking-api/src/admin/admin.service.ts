import { BadRequestException, ConflictException, HttpStatus, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto';
import { GroceryItems } from 'src/database/entities/grocery-items.entity';
import { GroceryItemsService } from 'src/database/services/grocery-items.service';

@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);

    constructor(private readonly groceryItemService: GroceryItemsService) {}

    /**
     * Function to insert items
     * @param data 
     * @returns 
     */
    async insertGroceryItem(data: Partial<GroceryItems>): Promise<ResponseDTO> {
        const id = await this.groceryItemService.insert(data).catch(async error => {
            
            if(error.code == 23505) {
                this.logger.error(`Grocery Item: ${data.name} already exists in the grocery store.`);
                throw new ConflictException(`Grocery Item ${data.name} already exists in the grocery store.`);
            }

            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });
        
        if(id) {
            return {
                status: HttpStatus.OK,
                message: 'Grocery Item added sucessfuly.'
            }
        }
    }


    /**
     * Function to fetch all Items
     * @returns 
     */
    async getAllItem(): Promise<ResponseDTO> {
        const data = await this.groceryItemService.findAll().catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });

        if(data.length == 0) {
            return {
                status: HttpStatus.OK,
                message: `Grocery Store is Empty!`
            }
        }

        return {
            status: HttpStatus.OK,
            response: data
        }
    }


    /**
     * Fucntion to delete an Item.
     * @param name 
     * @returns 
     */
    async deleteItem(name: string): Promise<ResponseDTO> {
        const affected = await this.groceryItemService.delete(name).catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });

        if(affected == 0) {
            this.logger.error(`The Grocery Item ${name} you are trying to delete does not exist in the grocery store.`);
            throw new NotFoundException(`The Grocery Item ${name} you are trying to delete does not exist in the grocery store.`);
        }

        return {
            status: HttpStatus.OK,
            message: `Grocery Item ${name} is deleted successfuly.`
        }
    }


    /**
     * Function to update an Item.
     * @param payload 
     * @returns 
     */
    async updateItem(payload: Partial<GroceryItems>): Promise<ResponseDTO> {
        if(payload.name === undefined) throw new BadRequestException(`The 'name' field is required in the request body`);

        const affected = await this.groceryItemService.update(payload).catch(async error => {
            this.logger.error(`Something went Wrong! ${error}`);
            throw new InternalServerErrorException('Something went Wrong!');
        });

        if(affected == 0) {
            this.logger.error(`The Grocery Item ${payload.name} you are trying to update does not exist in the grocery store.`);
            throw new NotFoundException(`The Grocery Item ${payload.name} you are trying to update does not exist in the grocery store.`);
        }

        return {
            status: HttpStatus.OK,
            message: `Grocery Item ${payload.name} is updated successfuly.`
        }
    }
}
