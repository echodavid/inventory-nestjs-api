import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserUsernameDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LogingUserEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    password: string;
}