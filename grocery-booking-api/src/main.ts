import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Exception Handler
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Swagger Documentation
   */
  const defaultEnv = process.env.INSTANCE_URL || 'http://localhost:3000/';
  const localEnv = process.env.LOCAL_URL;
  const prodEnv = process.env.PROD_URL;

  const options = new DocumentBuilder()
    .setTitle('Grocery Booking API')
    .setDescription('<h4>The Grocery Booking API facilitates the seamless booking and management of grocery orders for customers.\
    With this API, users can browse available grocery items, add them to their cart.\
    Admins can add, update, fetch and delete grocery items.</h4>')
    .setVersion('1.0')
    .addServer(defaultEnv, 'Default environment')
    .addServer(localEnv, 'Local environment')
    .addServer(prodEnv, 'Production environment')
    .build();
  
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

}

bootstrap();
