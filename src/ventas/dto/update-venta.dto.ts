import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { CreateVentaDto } from './create-venta.dto';
import { EstadoVenta } from '../interfaces/validEstadoVenta.interface';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    @IsOptional()
    @IsNumber()
    @IsOptional()
    total: number;

    @IsOptional()
    @IsEnum(EstadoVenta, { message: 'El estado debe ser uno de los siguientes valores: Pendiente, Pagada, Cancelado' })
    estado: EstadoVenta
}
