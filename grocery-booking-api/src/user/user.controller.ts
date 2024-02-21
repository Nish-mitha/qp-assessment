import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailIdDTO, OrderItemDTO, ResponseDTO } from 'src/common/dto';
import { UserService } from './user.service';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FetchItemsSchema, FetchOrderSchema, OrderItemsSchema, UserTag } from 'src/swagger/user.schema';
import { CommonSchema } from 'src/swagger/common.schema';

@ApiTags(UserTag)
@ApiResponse(CommonSchema.responses[500])
@ApiResponse(CommonSchema.responses[503])
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    /**
     * Route to View the list of available grocery items.
     * @returns 
     */
    @ApiResponse(FetchItemsSchema.responses[200])
    @Get('fetchItems')
    async fetchItems(): Promise<ResponseDTO> {
        return await this.userService.fetchAllItems();
    }


    /**
     * Route to Ability to book multiple grocery items in a single order.
     * @param payload 
     * @returns 
     */
    @ApiBody({ type: OrderItemDTO })
    @ApiResponse(OrderItemsSchema.responses[200])
    @Post('orderItems')
    async orderItems(@Body() payload: OrderItemDTO[]): Promise<ResponseDTO> {
        return await this.userService.orderItems(payload);
    }

    /**
     * Route to fetch ordered item.
     * @returns 
     */
    @ApiResponse(FetchOrderSchema.responses[200])
    @Get('fetchOrder')
    async fetchOrder(): Promise<ResponseDTO> {
        return await this.userService.fetchOrder();
    }
}
