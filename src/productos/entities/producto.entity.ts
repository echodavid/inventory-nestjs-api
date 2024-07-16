import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class Producto extends Document {
    //id - mongo lo da

    
    @Prop({
        unique: true,
        index: true,
        minlength: 3,
        maxlength: 30,
        required: true
    })
    nombre: string;

    @Prop({
        minlength: 3,
        maxlength: 100,
    })
    descripcion: string;

    @Prop({
        type: Number,
        required: true,
        min: 0,
        default: 0
    })
    precio: number;

    @Prop({
        minlength: 3,
        maxlength: 20,
        required: true
    })
    tamanoUnidad: string;
    
    @Prop({
        type: Number,
        required: true,
        min: 0,
        default: 0
    })
    stock: number;
    
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
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
