import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { GroceryItemsService } from './services/grocery-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { GroceryItems } from './entities/grocery-items.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, GroceryItems])],
    providers: [CartService, GroceryItemsService],
    exports: [CartService, GroceryItemsService]
})
export class DatabaseModule {

}
