import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";
import { ValidRolesInterface } from "../interfaces";


export class CreateUserDto {
    @IsString()
    @MinLength(8, { message: 'The username is too short, it must has at least 8 characters' })
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6,
        { message: 'The password is too short, it must has at least 6 characters' }
    )
    @MaxLength(30,
        { message: 'The password is too long, it must has at most 30 characters'}
    )
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsArray()
    @IsEnum(ValidRolesInterface, { each: true })
    roles: string;

    @IsString()
    @IsNotEmpty({
        message: 'The name is required'
    })
    name: string;

    @IsString()
    @IsNotEmpty({
        message: 'The lastName is required'
    })
    lastName: string;

}
