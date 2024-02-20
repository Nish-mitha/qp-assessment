import { HttpStatus } from "@nestjs/common";
import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator";


export class GroceryItemsDTO {

    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsNumber()
    price: number;

    @IsNumber()
    availability: number;

}

export class OrderItemDTO {

    @IsString()
    @IsEmail()
    userEmail: string;

    @IsString()
    itemName: string;

    @IsNumber()
    quantity: number;
}

export class ResponseDTO {
    
    @IsEnum(HttpStatus)
    status: string;

    @IsString()
    message: string;
}