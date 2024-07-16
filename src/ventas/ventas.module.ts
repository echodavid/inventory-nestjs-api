import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Venta, VentaSchema } from './entities/venta.entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Venta.name,
        schema: VentaSchema,
      },
    ]),
    ProductosModule,
    AuthModule,
  ],
  exports: [MongooseModule]
})
export class VentasModule {}
