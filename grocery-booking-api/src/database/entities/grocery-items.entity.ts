import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('tbl_grocery_items')
export class GroceryItems {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    availability: number;
}