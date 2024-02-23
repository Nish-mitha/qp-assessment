import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemDTO } from 'src/common/dto';
import { Cart } from 'src/database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>
    ) {}

    
    /**
     * Function to fetch orders.
     * @returns 
     */
    find(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    /**
     * Function to add items to cart.
     * @param data 
     * @returns 
     */
    insert(data: Partial<Cart>): Promise<number> {
        return this.cartRepository.insert(data).then(({ raw }) => raw[0].id);
    }
}
