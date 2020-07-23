// @IsAlpha()
// @IsNotEmpty()
// @MinLength()
// @MaxLength()
// @IsBoolean()
// @IsEmpty()
// @Isint()
// @IsPositive()
// @IsOptional()
// @IsNumber()

import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto{

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(3)
    @IsAlpha()
    nombre:string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad:number; //enteros

    @IsNotEmpty()
    @IsBoolean()
    peludo:boolean;

    @IsBoolean()
    @IsOptional()
    casado?:boolean;

    @IsNotEmpty()
    @IsNumber()
    peso:number; //decimales

}