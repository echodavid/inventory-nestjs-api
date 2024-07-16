import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private readonly secret = process.env.JWT_SECRET,
        @InjectModel(User.name) 
        private userModel: Model<User>,
    ) {
        super(
            {
                // TODO: Config module
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "ADsecreto",
            }
        );
    }
    


    async validate(payload: JwtPayload) : Promise<User> {

        const { username } = payload;

        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Token not valid');
        }

        if( !user.isActive ) {
            throw new UnauthorizedException('User is not active');
        }

        //se añade a la request
        return user;
    }
}