import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo permite data que está definida en el DTO
      forbidNonWhitelisted: true, //lanza un error si hay data no permitida
      transform: true, //transforma la data a su tipo correct
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
