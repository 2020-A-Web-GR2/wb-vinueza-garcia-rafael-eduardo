import {IsAlpha, IsAlphanumeric, IsNotEmpty, MaxLength, MinLength} from "class-validator";


export class UsuarioCreateDto {

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(5)
    @IsAlpha()
    usuario:string;

    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(4)
    @IsAlphanumeric()
    contrasenia:string;
}