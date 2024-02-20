import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryItems } from 'src/database/entities/grocery-items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroceryItemsService {

    constructor(
        @InjectRepository(GroceryItems) private groceryItemsRepository: Repository<GroceryItems>
    ) {}

    insert(data) {
        return this.groceryItemsRepository.insert(data);
    }

    findAll() {
        return this.groceryItemsRepository.find();
    }

    delete(itemName: string) {
        return this.groceryItemsRepository.delete(itemName);
    }

    // update(data) {
    //     return this.groceryItemsRepository.update()
    // }
}
