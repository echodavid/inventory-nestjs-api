import { Controller, Get, Post, Body,UseGuards, Delete, Param } from '@nestjs/common';

import { CreateUserDto, LoginUserUsernameDto, LogingUserEmailDto } from './dto';
import { AuthService } from './auth.service';
import { ValidRolesInterface } from './interfaces';
import { Auth } from './decorators';
import { IsMongoIdPipe } from '../common/pipes/IsMongo.pipe';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  
  @Post('login')
  loginUsername(@Body() loginUserDto: LoginUserUsernameDto) {
    return this.authService.loginUsername(loginUserDto);
  }

  @Post('login/email')
  loginEmail(@Body() loginUserDto: LogingUserEmailDto) {
    return this.authService.loginEmail(loginUserDto);
  }

  @Delete(':id')
  @Auth(ValidRolesInterface.super)
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.authService.remove(id);
  }

  

  // @Post('login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

}
