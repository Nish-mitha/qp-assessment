import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.26.0.2',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'grocery_booking',
      entities: [],
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    DatabaseModule
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
