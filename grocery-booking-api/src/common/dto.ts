import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsString, Min } from "class-validator";
import { Cart } from "src/database/entities/cart.entity";
import { GroceryItems } from "src/database/entities/grocery-items.entity";


export class GroceryItemsDTO {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    price: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    quantity_available: number;

}

export class OrderItemDTO {

    @ApiProperty()
    @IsString()
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @IsString()
    itemName: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    quantity: number;
}


export class ResponseDTO {
    
    @IsEnum(HttpStatus)
    status: number;

    @IsString()
    message?: string;

    @IsString()
    response?: GroceryItems[] | Cart[];
}

export class EmailIdDTO {
    
    @IsString()
    @IsEmail()
    emailId: string;
}