import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LogingUserEmailDto, LoginUserUsernameDto } from './dto';
import { JwtPayload } from './interfaces';
import { ErrorCodes, NotFoundResponse } from 'src/common/const/ErrorCodes';





@Injectable()
export class AuthService {
  
  constructor(

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,


  ) {}

  

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const user = await this.userModel.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });
      const result = await user.save();
      const { password: _, ...userWithoutPassword } = result.toObject();
      return {
        user: userWithoutPassword,
        jwt: this.getJwt({ username: user.username }),
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async loginUsername(loginUserDto: LoginUserUsernameDto) {
    try {
      const { username, password } = loginUserDto;
      const user = await this.userModel.findOne({ username });
      const result = this.login( user, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async loginEmail(loginUserDto: LogingUserEmailDto) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.userModel.findOne({ email });
      const result = this.login( user, password );
      return result;
    } catch (error) {
      throw error
    }
  }

  private async login( user: User, password: string) {
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException("Invalid credentials");
    }
    await this.userModel.updateOne({ _id: user._id }, { isActive: true });
    const { _id, email, name, lastName } = user.toObject();
    return {
      user: {
        _id,
        email,
        name,
        lastName,
      },
      jwt: this.getJwt({ username: user.username }),
    }
  }

  private getJwt(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id});
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

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
