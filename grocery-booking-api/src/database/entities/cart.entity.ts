import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_cart')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    userEmail: string;

    @Column()
    itemName: string;

    @Column()
    quantity: number;
}