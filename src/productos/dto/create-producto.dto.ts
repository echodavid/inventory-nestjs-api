import { IsNumber, IsOptional, IsPositive, IsString, Min, min, MinLength } from "class-validator";

export class CreateProductoDto {

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    @IsPositive()
    precio: number;

    @IsString()
    tamanoUnidad: string;

    @IsNumber()
    @Min(0)
    stock: number;

}
