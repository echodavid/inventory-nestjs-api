import { Type } from "class-transformer";
import { IsArray, IsInt, IsMongoId, IsNumber, IsOptional, IsPositive, Validate, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

class DetalleVentasDto {
    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    precio: number;

    @IsMongoId()
    idProducto: Schema.Types.ObjectId;

}

export class CreateVentaDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetalleVentasDto)
    detalles: DetalleVentasDto[];
    
}
