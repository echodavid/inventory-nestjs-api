import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaType } from 'mongoose';

import { Producto } from "../../productos/entities/producto.entity";
import { EstadoVenta } from "../interfaces/validEstadoVenta.interface";



@Schema()
export class Venta extends Document{

    // id: string; mongo lo da
    @Prop({
        type: Date,
        default: Date.now,
    })
    fechaCreacion: Date;

    @Prop({
        type: Date,
        default: Date.now,
    })
    fechaActualizacion: Date;

    @Prop({
        type: Number,
        required: true,
        min: 0,
    })
    total: number;

    @Prop({
        type: String,
        enum: EstadoVenta,
        default: EstadoVenta.PENDIENTE
    })
    estado: EstadoVenta;

    // --------Relaciones-------
    @Prop({
        type: [{
            cantidad: { type: Number, required: true, min: 0, default: 0 },
            precio: { type: Number, required: true, min: 0, default: 0 },
            idProducto: { type: SchemaType.Types.ObjectId, ref: Producto.name, required: true, index: true}
        }],
        array: true,
        required: true,
    })
    detalles: {
        cantidad: number,
        precios: number,
        idProducto: SchemaType.Types.ObjectId
    }[]

    // TODO: Relación clientes
    // TODO: Relación detalles vendedor
    // TODO: Relación detalles pago

}


export const VentaSchema = SchemaFactory.createForClass(Venta);

