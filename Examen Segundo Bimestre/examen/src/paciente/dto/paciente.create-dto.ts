import {IsAlpha, IsDate, IsNotEmpty, IsNumberString, MaxDate, MaxLength, MinDate, MinLength} from "class-validator";

export class PacienteCreateDto{

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(5)
    nombre:string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    @IsNumberString()
    cedula:string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    @IsNumberString()
    telefono:string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    @IsNumberString()
    numeroHistorial:string;

    @IsNotEmpty()
    @IsDate()
    @MinDate(new Date('2000-01-01'))
    @MaxDate(new Date('2025-01-01'))
    fechaHistorial:Date;

}