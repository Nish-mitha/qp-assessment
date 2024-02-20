import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { Cart } from './database/entities/cart.entity';
import { GroceryItems } from './database/entities/grocery-items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.16.2',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'grocery_booking',
      entities: [Cart, GroceryItems],
      synchronize: true,
    }),
    UserModule,
    AdminModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
