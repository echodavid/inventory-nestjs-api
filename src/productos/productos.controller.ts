import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { ProductosService } from './productos.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IsMongoIdPipe } from '../common/pipes/IsMongo.pipe';
import { CreateProductoDto, UpdateProductoDto } from './dto';
import { ValidRolesInterface } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }


  @Get()
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super, ValidRolesInterface.user, ValidRolesInterface.guest)
  findAll(
    @Query() PaginationDto: PaginationDto
  ) {
    return this.productosService.findAll( PaginationDto );
  }

  @Get(':id')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super, ValidRolesInterface.user, ValidRolesInterface.guest)
  @Auth()
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  update(@Param('id', IsMongoIdPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.productosService.remove(id);
  }
}
