import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

import { ValidRolesInterface } from "../interfaces";

@Schema()
export class User extends Document{

    @Prop({
        unique: true,
        required: true,
        type: String
    })
    username: string;

    @Prop({
        type: String,
        unique: true,
        required: true
    })
    email: string;

    @Prop({
        required: true,
        type: String
    })
    password: string;


    @Prop({
        type: [{ type: String, enum: Object.values(ValidRolesInterface) }], 
        default: [ValidRolesInterface.guest]

    })
    roles: ValidRolesInterface[];

    @Prop({
        type: Boolean,
        default: false,
    })
    isActive: boolean;
    
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: String,
        required: true
    })
    lastName: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);
