import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryItems } from 'src/database/entities/grocery-items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroceryItemsService {

    constructor(
        @InjectRepository(GroceryItems) private groceryItemsRepository: Repository<GroceryItems>
    ) {}

    /**
     * Function to insert items.
     * @param data 
     * @returns 
     */
    insert(data: Partial<GroceryItems>): Promise<number> {
        return this.groceryItemsRepository.insert(data).then(({ raw }) => raw[0].id);
    }

    /**
     * Function to find all items.
     * @returns 
     */
    findAll(): Promise<GroceryItems[]> {
        return this.groceryItemsRepository.find();
    }

    /**
     * Function to delete item.
     * @param itemName 
     * @returns 
     */
    delete(itemName: string): Promise<number> {
        return this.groceryItemsRepository.delete({ name: itemName }).then(({ affected }) => affected);
    }

    /**
     * Function to update item.
     * @param data 
     * @returns 
     */
    update(data: Partial<GroceryItems>): Promise<number> {
        return this.groceryItemsRepository.update({ name: data.name }, data).then(({ affected }) => affected);
    }
}
