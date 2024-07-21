import { Injectable } from '@nestjs/common';


import { AuthService } from '../auth/auth.service';
import { initialData } from './data/seed-data';
import { CreateUserDto } from '../auth/dto';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    private readonly productosService: ProductosService

  ) {}
  
  async execute() {
    console.log('Seeding data...');
    try {
      await this.insertUsers();
      await this.insertProducts();
      console.log('Data seeded');
    } catch (error) {
      console.log('Error seeding data');
      throw error;
    }
  }

  private async insertProducts(){
    try {
      await this.productosService.deleteAll();
      const productos = initialData.initProducts
      let promises = productos.map(async (producto) => {
        return await this.productosService.create(producto);
      });
      await Promise.all(promises);
      return 
    } catch (error) {
      console.log('Error deleting productos');
      throw error;
    }
  }


  private async insertUsers() {
    try {
      await this.authService.deleteAll();
      const productos = initialData.initUsers
      let promises = productos.map(async (user: CreateUserDto) => {
        return await this.authService.create(user);
      });
      await Promise.all(promises);
      return 
    } catch (error) {
      console.log('Error deleting users');
      throw error;
    }
  }
}
