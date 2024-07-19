import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IsMongoIdPipe } from '../common/pipes/IsMongo.pipe';
import { Auth } from '../auth/decorators';
import { ValidRolesInterface } from '../auth/interfaces';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @Auth(ValidRolesInterface.user, ValidRolesInterface.admin, ValidRolesInterface.super)
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @Auth(ValidRolesInterface.guest, ValidRolesInterface.user, ValidRolesInterface.admin, ValidRolesInterface.super)
  findAll(
    @Query() PaginationDto: PaginationDto
  ) {
    return this.ventasService.findAll(PaginationDto);
  }

  @Get(':id')
  @Auth(ValidRolesInterface.guest, ValidRolesInterface.user, ValidRolesInterface.admin, ValidRolesInterface.super)
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.findOne(id);
  }
  //realmente no usar
  @Patch(':id')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  update(@Param('id', IsMongoIdPipe) id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Patch(':id/cancelar')
  @Auth(ValidRolesInterface.user, ValidRolesInterface.admin, ValidRolesInterface.super)
  cancelar(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.cancelar(id);
  }
  @Patch(':id/pagar')
  @Auth(ValidRolesInterface.user, ValidRolesInterface.admin, ValidRolesInterface.super)
  pagar(@Param('id', IsMongoIdPipe) id: string) {
    console.log(id);
    return this.ventasService.pagar(id);
  }

  @Delete(':id')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.ventasService.remove(id);
  }
}
