import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { isMongoId } from 'class-validator';

import { Producto } from './entities/producto.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UpdateProductoDto, CreateProductoDto } from './dto';
import { ErrorCodes, NotFoundResponse } from '../common/const/ErrorCodes';




@Injectable()
export class ProductosService {

  constructor(

    @InjectModel( Producto.name ) 
    private readonly productoModel: Model<Producto>,

  ) {}


  async create(createProductoDto: CreateProductoDto) {
    console.log(createProductoDto);

    try{
      const producto = await this.productoModel.create(createProductoDto);
      console.log(producto);
      const {__v, ...rest} = producto.toObject();
      return rest;
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }

  }

  async findAll( paginationDto: PaginationDto ) {
    // TODO: add config
    const { limit = 10, offset = 0 } = paginationDto;

    try{
      return await this.productoModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v')
      .exec();
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }

  //find by id
  async findOne(id: Schema.Types.ObjectId | string) {
    
    let producto: Producto;

    if ( isMongoId(id) ) {
      try{
        producto = await this.productoModel.findById(id).select('-__v').exec();
      } catch (error) {
        console.log(error.code);
        throw new InternalServerErrorException('Error en la operacion');
      }
      if( !producto )  {
        const response: NotFoundResponse = {
          message: 'Producto no encontrado',
          statusCode: ErrorCodes.notFound,
          errors: {
            notFound: [id.toString()],
          },
        };
        throw new NotFoundException(response);
      }
      
    } else{
      throw new BadRequestException('Id invalido');
    }
    return producto;
  }

  async update(id: Schema.Types.ObjectId | string, updateProductoDto: UpdateProductoDto) {

    if( !isMongoId(id) ) {
      throw new BadRequestException('Id invalido');
    }

    const producto = await this.findOne(id);
    
    try{
      await producto.updateOne(updateProductoDto, { new: true });
      return ({...producto.toJSON(), ...updateProductoDto});
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }

  async returnMany( ids: Schema.Types.ObjectId[], cantidades: UpdateProductoDto["stock"][] ) {
    console.log(ids, cantidades);
    if( ids.length !== cantidades.length ) {
      throw new BadRequestException('Ids y cantidades deben tener la misma longitud');
    }
    try {
      const errors = {
        notFound: [],
      };
      const promisesFind = ids.map( async (id, index) => {
        try {
          const one = await this.findOne(id.toString());
          console.log(one);
          one.stock += cantidades[index];
          return one;
        } catch (error) {
          console.log(error);
          console.log("notfound");
          errors.notFound.push(id);
          return null
        }
      } );
      const resolvedPromises = await Promise.all(promisesFind);

      const productos = resolvedPromises.filter( producto => producto !== null );

      console.log(productos);

      const updateOperations = productos.map( producto => producto.save() );

      await Promise.all(updateOperations);
      const ret = errors.notFound.length > 0 ? errors : null;
      return (ret);
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
  }
  
  async sellMany( ids: Schema.Types.ObjectId[], cantidades: UpdateProductoDto["stock"][] ) {
    if( ids.length !== cantidades.length ) {
      throw new BadRequestException('Ids y cantidades deben tener la misma longitud');
    }
    try {
      const errors = {
        notFound: [],
        noStock: []
      };
      const promisesFind = ids.map(async (id, index  )=> {
        try {
          const one =  await this.findOne(id);
          if(one.stock < cantidades[index]) {
            errors.noStock.push({ id: one._id, stock: one.stock });
          } else {
            one.stock -= cantidades[index];
          }
          return one;
        } catch (error) {
          errors.notFound.push(id);
          return null
        }
      });

      const resolvedPromises = await Promise.all(promisesFind);
      
      if (errors.notFound.length > 0 || errors.noStock.length > 0) {
        const response: NotFoundResponse = {
          message: 'Producto no encontrado | Stock insuficiente',
          statusCode: ErrorCodes.notFound,
          errors: {
            notFound: errors.notFound.map( id => id.toString() ),
            noStock: errors.noStock.map( ({ id, stock }) => ({ id: id.toString(), stock }) ),
          },
        };
        throw new NotFoundException(response);
      }
      const productos = [...resolvedPromises];
      
      const updateOperations = productos.map( producto => producto.save() );

      await Promise.all(updateOperations);

      return productos;

    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async remove(id: string) {

    const result = await this.productoModel.deleteOne({ _id: id })
    if( result.deletedCount === 0 ) {
      const response: NotFoundResponse = {
        message: 'Producto no encontrado',
        statusCode: ErrorCodes.notFound,
        errors: {
          notFound: [id],
        },
      };
      throw new NotFoundException(response);
    }

    return
  }

  async deleteAll() {
    try {
      const result = await this.productoModel.deleteMany({});
    } catch (error) {
      throw new InternalServerErrorException('Error en la operacion');
    }
    return;
  }
  
}
