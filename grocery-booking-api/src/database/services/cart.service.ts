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


    findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    insert(data: OrderItemDTO[]) {
        return this.cartRepository.insert(data)
    }
}
