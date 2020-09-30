import {
    IsAlpha,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumberString, MaxDate,
    MaxLength, MinDate,
    MinLength
} from "class-validator";

export class UsuarioCreateDto {

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(5)
    nombre:string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    @IsNumberString()
    telefono:string;

    @IsNotEmpty()
    @MaxLength(40)
    @MinLength(5)
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(4)
    contrasenia:string;

    @IsNotEmpty()
    @MinDate(new Date('1900-01-01'))
    @MaxDate(new Date('2025-01-01'))
    @IsDate()
    fechaNacimiento:Date;
}