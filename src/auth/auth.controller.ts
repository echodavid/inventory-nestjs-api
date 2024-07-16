import { Controller, Get, Post, Body,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, LoginUserUsernameDto, LogingUserEmailDto } from './dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { ValidRolesInterface } from './interfaces';
import { Auth, GetUser } from './decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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

  @Get('private')
  @Auth(ValidRolesInterface.admin, ValidRolesInterface.super)
  private(
    @GetUser() user: User,
  ) {
    console.log({user});
    return {
      message: 'This is a private route',
      user: user,
    };
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
