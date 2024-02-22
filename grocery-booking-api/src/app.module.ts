import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { getDatabaseConfig } from './database/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
    UserModule,
    AdminModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true })
    }
  ],
})
export class AppModule {}
