import { DATABASE_NAME, POSTGRES_PORT } from "src/common/conatant";
import { Cart } from "./entities/cart.entity";
import { GroceryItems } from "./entities/grocery-items.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Database configuration based on instance
 * @returns 
 */
export function getDatabaseConfig() {
    let config: TypeOrmModuleOptions = {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: POSTGRES_PORT,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: DATABASE_NAME,
        entities: [Cart, GroceryItems],
        synchronize: true,
    };
    
    if(process.env.INSTANCE == "PROD") {
        config = {
            type: 'postgres',
            url: process.env.POSTGRES_URL,
            username: process.env.POSTGRES_PROD_USERNAME,
            password: process.env.POSTGRES__PROD_PASSWORD,
            database: DATABASE_NAME,
            entities: [Cart, GroceryItems],
            synchronize: true,
        };
    }
    return config;
}