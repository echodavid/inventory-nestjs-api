import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { ProductosService } from './productos.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IsMongoIdPipe } from '../common/pipes/IsMongo.pipe';
import { CreateProductoDto, UpdateProductoDto } from './dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }


  @Get()
  findAll(
    @Query() PaginationDto: PaginationDto
  ) {
    return this.productosService.findAll( PaginationDto );
  }

  @Get(':id')
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IsMongoIdPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.productosService.remove(id);
  }
}
