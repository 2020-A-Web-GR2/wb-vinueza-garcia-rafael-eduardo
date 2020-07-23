import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";
import {NumerosCreateDto} from "./dto/numeros.create_dto";
import {validate, ValidationError} from "class-validator";

@Controller('deber1')
export class Deber1Controller{

    @Get('suma')
    @HttpCode(200)
    async suma(
        @Query() parametrosDeConsulta,
        @Req() req
    ){
        const numerosValidos = new NumerosCreateDto()

        if(req.cookies.usuario != null && req.cookies.usuario != undefined){
            if(isNaN(parametrosDeConsulta.n1) || isNaN(parametrosDeConsulta.n2)){
                throw new BadRequestException('Los parametros ingresados no son numeros');
            }

            numerosValidos.n1 = Number(parametrosDeConsulta.n1)
            numerosValidos.n2 = Number(parametrosDeConsulta.n2)

            try {
                const errores:ValidationError[] = await validate(numerosValidos)
                if(errores.length > 0){
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error validando');
                }else{
                    return numerosValidos.n1 + numerosValidos.n2
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            throw new BadRequestException("No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora");
        }
    }


    @Put('resta')
    @HttpCode(201)
    async resta(
        @Body() parametrosCuerpo,
        @Req() req
    ){
        const numerosValidos = new NumerosCreateDto()

        if(req.cookies.usuario != null && req.cookies.usuario != undefined){
            if(isNaN(parametrosCuerpo.n1) || isNaN(parametrosCuerpo.n2)){
                throw new BadRequestException('Los parametros ingresados no son numeros');
            }

            numerosValidos.n1 = parametrosCuerpo.n1
            numerosValidos.n2 = parametrosCuerpo.n2

            try {
                const errores:ValidationError[] = await validate(numerosValidos)
                if(errores.length > 0){
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error validando');
                }else{
                    return numerosValidos.n1 - numerosValidos.n2
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            throw new BadRequestException("No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora");
        }
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Headers() cabeceras,
        @Req() req
    ){
        const numerosValidos = new NumerosCreateDto()

        if(req.cookies.usuario != null && req.cookies.usuario != undefined){
            if(isNaN(cabeceras.n1) || isNaN(cabeceras.n2)){
                throw new BadRequestException('Los parametros ingresados no son numeros');
            }

            numerosValidos.n1 = Number(cabeceras.n1)
            numerosValidos.n2 = Number(cabeceras.n2)

            try {
                const errores:ValidationError[] = await validate(numerosValidos)
                if(errores.length > 0){
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error validando');
                }else{
                    return numerosValidos.n1 * numerosValidos.n2
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            throw new BadRequestException("No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora");
        }
    }


    @Post('division/:n1/:n2')
    @HttpCode(201)
    async division(
        @Param() parametrosRuta,
        @Req() req
    ){
        const numerosValidos = new NumerosCreateDto()

        if(req.cookies.usuario != null && req.cookies.usuario != undefined){
            if(isNaN(parametrosRuta.n1) || isNaN(parametrosRuta.n2)){
                throw new BadRequestException("Los parametros ingresados no son numeros");
            }else if(parametrosRuta.n2 == 0){
                throw new BadRequestException("n2 debe ser distinto de cero");
            }

            numerosValidos.n1 = Number(parametrosRuta.n1)
            numerosValidos.n2 = Number(parametrosRuta.n2)

            try {
                const errores:ValidationError[] = await validate(numerosValidos)
                if(errores.length > 0){
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error validando');
                }else{
                    return numerosValidos.n1 / numerosValidos.n2
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            throw new BadRequestException("No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora");
        }


    }

    @Get('guardarNombreUsuario')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //request o peticion
        @Res() res //response o respuesta
    ){

        if(parametrosConsulta.nombre != null && parametrosConsulta.nombre != undefined){
            res.cookie('usuario', //nombre
                parametrosConsulta.nombre //valor
            );

            const mensaje = {
                mensaje:'usuario guardado'
            };
            res.send(mensaje);
        }else{
            throw new BadRequestException('No se ha enviado el parametro "nombre"');
        }


    }


    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }
}