import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  imports: [
      MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema,
        },
      ]),

      PassportModule.register(
        { defaultStrategy: 'jwt' }
      ),

      JwtModule.registerAsync({
        imports: [ ConfigModule],
        inject: [],
        useFactory: () => {
          return {
            secret: process.env.JWT_SECRET,
            signOptions: {
              expiresIn: process.env.JWT_EXPIRES_IN,
            },
          }
        }
      }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, MongooseModule, PassportModule, JwtModule],
})
export class AuthModule {}
