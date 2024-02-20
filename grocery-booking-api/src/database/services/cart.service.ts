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
     * Function to fetch items based on email id.
     * @param id 
     * @returns 
     */
    findByEmailId(id: string): Promise<Cart[]> {
        return this.cartRepository.findBy({ userEmail: id });
    }

    /**
     * Function to add items to cart.
     * @param data 
     * @returns 
     */
    insert(data: Partial<OrderItemDTO>[]): Promise<number> {
        return this.cartRepository.insert(data).then(({ raw }) => raw[0].id);
    }
}
