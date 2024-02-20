import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * tbl_cart Entity
 */

@Entity('tbl_cart')
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    userEmail: string;

    @Column()
    itemName: string;

    @Column()
    quantity: number;
}