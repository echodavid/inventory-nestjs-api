import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IsMongoIdPipe } from '../common/pipes/IsMongo.pipe';
import { Auth } from 'src/auth/decorators';
import { ValidRolesInterface } from 'src/auth/interfaces';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @Auth(ValidRolesInterface.admin)
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  findAll(
    @Query() PaginationDto: PaginationDto
  ) {
    return this.ventasService.findAll(PaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.findOne(id);
  }
  //realmente no usar
  @Patch(':id')
  update(@Param('id', IsMongoIdPipe) id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.cancelar(id);
  }
  @Patch(':id/pagar')
  pagar(@Param('id', IsMongoIdPipe) id: string) {
    console.log(id);
    return this.ventasService.pagar(id);
  }

  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.remove(id);
  }
}
