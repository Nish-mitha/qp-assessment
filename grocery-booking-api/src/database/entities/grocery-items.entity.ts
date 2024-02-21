import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * tbl_grocery_items Entity
 */

@Entity('tbl_grocery_items')
export class GroceryItems {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true})
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;
}