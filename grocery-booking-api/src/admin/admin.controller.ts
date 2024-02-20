import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { GroceryItemsDTO, ResponseDTO } from 'src/common/dto';

@Controller('admin')
export class AdminController {

    @Post('addItems')
    addItems(@Body() payload: GroceryItemsDTO){
        console.log(payload);

        // return {
        //     status: HttpStatus.OK,
        //     message: "Grocery Item added sucessfuly."'
        // }
        
    }

    @Get('getItems')
    getItems() {

    }

    @Delete('deleteItems/:itemName')
    deleteItems(@Param() itemName: string) {

    }

    @Put('updateItem')
    updateItem(@Body() payload: Partial<GroceryItemsDTO>) {

    }

    //Need to check
}
