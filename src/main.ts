import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
