import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosModule } from './productos/productos.module';
import { CommonModule } from './common/common.module';
import { VentasModule } from './ventas/ventas.module';
import { AuthModule } from './auth/auth.module';
import { AppConfig } from './config/app.config';
import { SeedModule } from './seed/seed.module';



@Module({

  imports: [
    ConfigModule.forRoot({
      load: [ AppConfig ],
      
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/inventario',
      {
        // dbName: process.env.DB_NAME,
        // user: process.env.DB_USER,
        // pass: process.env.DB_PASS,
        // authSource: process.env.DB_AUTH,
        dbName: 'inventario'
      }
    ),
    ProductosModule,
    CommonModule,
    VentasModule,
    AuthModule,
    SeedModule,
  ],
})
export class AppModule {}
