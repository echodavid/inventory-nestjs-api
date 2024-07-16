import { Module } from '@nestjs/common';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      },
    ]),
    AuthModule,
  ],
  exports: [MongooseModule, ProductosService]
})
export class ProductosModule {}
