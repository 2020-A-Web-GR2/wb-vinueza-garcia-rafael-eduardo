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
        @Req() req,
        @Res() res
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

                    var respuesta:number = numerosValidos.n1 + numerosValidos.n2;
                    res.cookie('puntaje',Number(req.signedCookies.puntaje) - Math.abs(respuesta),{signed:true});
                    var mensaje:string = 'El resultado de la operacion es: ' + respuesta;

                    if(Number(req.signedCookies.puntaje) <= 0){
                        res.cookie('puntaje',100,{signed:true})
                        mensaje = mensaje + '\n' + req.cookies.usuario + ', haz terminado tus puntos, se te han restablecido de nuevo'
                    }

                    res.send(mensaje);
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            mensaje = "Error: No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora"
            res.send(mensaje);
        }
    }


    @Put('resta')
    @HttpCode(201)
    async resta(
        @Body() parametrosCuerpo,
        @Req() req,
        @Res() res
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
                    var respuesta:number = numerosValidos.n1 - numerosValidos.n2;
                    res.cookie('puntaje',Number(req.signedCookies.puntaje) - Math.abs(respuesta),{signed:true});
                    var mensaje:string = 'El resultado de la operacion es: ' + respuesta;

                    if(Number(req.signedCookies.puntaje) <= 0){
                        res.cookie('puntaje',100,{signed:true})
                        mensaje = mensaje + '\n' + req.cookies.usuario + ', haz terminado tus puntos, se te han restablecido de nuevo'
                    }

                    res.send(mensaje);
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            mensaje = "Error: No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora"
            res.send(mensaje);
        }
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    async multiplicacion(
        @Headers() cabeceras,
        @Req() req,
        @Res() res
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
                    var respuesta:number = numerosValidos.n1 * numerosValidos.n2;
                    res.cookie('puntaje',Number(req.signedCookies.puntaje) - Math.abs(respuesta),{signed:true});
                    var mensaje:string = 'El resultado de la operacion es: ' + respuesta;

                    if(Number(req.signedCookies.puntaje) <= 0){
                        res.cookie('puntaje',100,{signed:true})
                        mensaje = mensaje + '\n' + req.cookies.usuario + ', haz terminado tus puntos, se te han restablecido de nuevo'
                    }

                    res.send(mensaje);
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            mensaje = "Error: No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora"
            res.send(mensaje);
        }
    }


    @Post('division/:n1/:n2')
    @HttpCode(201)
    async division(
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
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
                    var respuesta:number = parseInt('' + numerosValidos.n1 / numerosValidos.n2,10);
                    res.cookie('puntaje',Number(req.signedCookies.puntaje) - Math.abs(respuesta),{signed:true});
                    var mensaje:string = 'El resultado de la operacion es: ' + respuesta;

                    if(Number(req.signedCookies.puntaje) <= 0){
                        res.cookie('puntaje',100,{signed:true})
                        mensaje = mensaje + '\n' + req.cookies.usuario + ', haz terminado tus puntos, se te han restablecido de nuevo'
                    }

                    res.send(mensaje);
                }
            }catch (e) {
                console.error(e);
                throw new BadRequestException('Error validando');
            }
        }else{
            mensaje = "Error: No se ha encontrado la galleta 'usuario', creela para usar las funciones de la calculadora"
            res.send(mensaje);
        }


    }

    @Get('guardarNombreUsuario')
    guardarCookies(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ){

        if(parametrosConsulta.nombre != null && parametrosConsulta.nombre != undefined){
            res.cookie('usuario',parametrosConsulta.nombre);
            res.cookie('puntaje',100,{signed:true});

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