import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GroceryItemsDTO, ResponseDTO } from 'src/common/dto';
import { AdminService } from './admin.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddItemSchema, AdminTag, DeleteItemSchema, UpdateItemSchema } from 'src/swagger/admin.schema';
import { CommonSchema } from 'src/swagger/common.schema';

@ApiTags(AdminTag)
@ApiResponse(CommonSchema.responses[500])
@ApiResponse(CommonSchema.responses[503])
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    /**
     *  Route to Add new grocery items to the system.
     * @param payload 
     * @returns 
     */
    @ApiBody({ type: GroceryItemsDTO })
    @ApiResponse(AddItemSchema.responses[200])
    @ApiResponse(AddItemSchema.responses[409])
    @Post('addItem')
    async addItem(@Body() payload: GroceryItemsDTO): Promise<ResponseDTO>{
        return await this.adminService.insertGroceryItem(payload); 
    }

    /**
     * Route to View existing grocery items.
     * @returns 
     */
    @ApiResponse(AddItemSchema.responses[200])
    @Get('getItem')
    async getItem(): Promise<ResponseDTO> {
        return await this.adminService.getAllItem();
    }

    /**
     * Route to Remove grocery items from the system
     * @param data 
     * @returns 
     */
    @ApiParam(DeleteItemSchema.parameter[0])
    @ApiResponse(DeleteItemSchema.responses[200])
    @ApiResponse(DeleteItemSchema.responses[404])
    @Delete('deleteItem/:itemName')
    async deleteItem(@Param() data: string): Promise<ResponseDTO> {
        return await this.adminService.deleteItem(data['itemName']);
    }

    /**
     * Route to Update details (e.g., name, price) of existing grocery items.
     * @param payload 
     * @returns 
     */
    @ApiBody({ type: GroceryItemsDTO })
    @ApiResponse(UpdateItemSchema.responses[200])
    @ApiResponse(UpdateItemSchema.responses[404])
    @Put('updateItem')
    async updateItem(@Body() payload: Partial<GroceryItemsDTO>): Promise<ResponseDTO> {
        return await this.adminService.updateItem(payload);
    }

    //Need to check one API
}
