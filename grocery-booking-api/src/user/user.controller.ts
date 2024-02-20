import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderItemDTO } from 'src/common/dto';

@Controller('user')
export class UserController {

    @Get('fetchItems')
    fetchItems() {

    }

    @Post('orderItems')
    orderItems(@Body() payload: OrderItemDTO) {

    }
}
