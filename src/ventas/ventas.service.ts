import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { isMongoId } from 'class-validator';

import { ErrorCodes, NotFoundResponse } from '../common/const/ErrorCodes';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto, UpdateVentaDto } from './dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ProductosService } from '../productos/productos.service';
import { EstadoVenta } from './interfaces/validEstadoVenta.interface';



@Injectable()
export class VentasService {
  constructor(
    @InjectModel ( Venta.name )
    private readonly ventaModel: Model<Venta>,

    private readonly productosService: ProductosService,

  ){

  }

  async create(createVentaDto: CreateVentaDto) {

    try {
      const idProductos = createVentaDto.detalles.map( detalle => detalle.idProducto );
      const cantidades = createVentaDto.detalles.map( detalle => detalle.cantidad );
      const productos = await this.productosService.sellMany(idProductos, cantidades);
      console.log(productos);
      if( productos.length !== idProductos.length ) {
        throw new BadRequestException('No se pudo realizar la venta');
      }
      let total = 0;
      createVentaDto.detalles.map( (detalle, index) => {
        detalle.precio = detalle.precio || productos[index].precio;
        total += detalle.precio * detalle.cantidad;
      });
  
      const venta = await this.ventaModel.create({
        ...createVentaDto,
        total
      });

      return venta;
    } catch (error) {
      throw error
    }
    
  }

  async findAll( paginationDto: PaginationDto) {
    //TODO: add config
    const { limit = 10, offset = 0 } = paginationDto;

    try{
      return await this.ventaModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v')
      .exec();
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }

  async findOne(id: Schema.Types.ObjectId | string) {

    let venta: Venta;

    if ( isMongoId(id) ) {
      try{
        venta = await this.ventaModel.findById(id).select('-__v').exec();
      } catch (error) {
        throw new InternalServerErrorException('Error en la operacion');
      }
      if( !venta ) {
        const response: NotFoundResponse = {
          message: 'Venta no encontrada',
          statusCode: ErrorCodes.notFound,
          errors: {
            notFound: [id.toString()],
          },
        };
        throw new NotFoundException(response);
      }
      return venta;
    }
    throw new BadRequestException('Id invalido');
  }


  //realmente no usar
  async update(id: Schema.Types.ObjectId | string, updateVentaDto: UpdateVentaDto) {
    
    if( !isMongoId(id) ) {
      throw new BadRequestException('Id invalido');
    }
    const venta = await this.findOne(id);
    if( !venta ) {
      const response: NotFoundResponse = {
        message: 'Venta no encontrada',
        statusCode: ErrorCodes.notFound,
        errors: {
          notFound: [id.toString()],
        },
      };
      throw new NotFoundException(response);
    }
    try{
      await venta.updateOne(updateVentaDto, { new: true });
      return ({...venta.toJSON(), ...updateVentaDto});
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }

  async cancelar(id: Schema.Types.ObjectId | string) {
    if( !isMongoId(id) ) {
      throw new BadRequestException('Id invalido');
    }
    try{
      const venta = await this.findOne(id);
      console.log(venta);
      if( !venta ) {
        const response: NotFoundResponse = {
          message: 'Venta no encontrada',
          statusCode: ErrorCodes.notFound,
          errors: {
            notFound: [id.toString()],
          },
        };
        throw new NotFoundException(response);
      }
      if( venta.estado === EstadoVenta.CANCELADA ) {
        throw new BadRequestException('La venta ya fue cancelada');
      }
      console.log(venta);
      const ventaUpdated = await venta.updateOne({estado: EstadoVenta.CANCELADA}, { new: true });
      const detalles = venta.detalles.map(detalle => detalle);
      const idProductos = detalles.map( detalle => {
        const id = detalle.idProducto 
        return id;
      });
      const cantidades = detalles.map( detalle => detalle.cantidad );
      const error = await this.productosService.returnMany(idProductos, cantidades);
      venta.estado = EstadoVenta.CANCELADA;
      const response = {venta};
      if( error ) {
        response['error'] = error;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async pagar(id: Schema.Types.ObjectId | string) {
    if( !isMongoId(id) ) {
      throw new BadRequestException('Id invalido');
    }
    const venta = await this.findOne(id);
    if( !venta ) {
      const response: NotFoundResponse = {
        message: 'Venta no encontrada',
        statusCode: ErrorCodes.notFound,
        errors: {
          notFound: [id.toString()],
        },
      };
      throw new NotFoundException(response);
    }
    if( venta.estado === EstadoVenta.PAGADA ) {
      throw new BadRequestException('La venta ya fue pagada');
    }
    if( venta.estado === EstadoVenta.CANCELADA ) {
      throw new BadRequestException('La venta fue cancelada, no se puede pagar');
    }
    try{
      await venta.updateOne({estado: EstadoVenta.PAGADA}, { new: true });
      console.log("hi");
      return {venta, ...{estado: EstadoVenta.PAGADA}};
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }

  async remove(id: string | Schema.Types.ObjectId) {
    if( !isMongoId(id) ) {
      throw new BadRequestException('Id invalido');
    }
    try{
      const venta = await this.ventaModel.deleteOne({_id: id}).exec();
      if( venta.deletedCount === 0 ) {
        const response: NotFoundResponse = {
          message: 'Venta no encontrada',
          statusCode: ErrorCodes.notFound,
          errors: {
            notFound: [id.toString()],
          },
        };
        throw new NotFoundException(response);
      }
      return;
    } catch (error) {
      throw error
    }
    
  }

}
