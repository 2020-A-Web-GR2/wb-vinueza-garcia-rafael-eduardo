import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

//http://localhost:3001/juegos-http
@Controller('juegos-http')

export class HttpJuegoController{

    @Get('hola')
    @HttpCode(200)
    holaGet(){
        throw new BadRequestException('No envia nada')
        //return 'Hola GET :)'
    }

    @Post('hola')
    @HttpCode(201)
    holaPost(){
        return 'Hola POST :V'
    }

    @Put('hola')
    @HttpCode(202)
    holaPut(){
        return 'Hola PUT >:{'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'Hola DELETE :()'
    }

    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);

        if(isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
            throw new BadRequestException();
        }

        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        if(parametrosDeConsulta.nombre && parametrosDeConsulta.apellido && parametrosDeConsulta.length == 2){
            return parametrosDeConsulta.nombre + parametrosDeConsulta.apellido
        }else{
            console.log('parametrosDeConsulta', parametrosDeConsulta);
            return '= )'
        }
    }

    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.nombre = parametrosCuerpo.nombre;
        mascotaValida.edad = parametrosCuerpo.edad;
        mascotaValida.peludo = parametrosCuerpo.peludo;
        mascotaValida.casado = parametrosCuerpo.casado;
        mascotaValida.peso = parametrosCuerpo.peso;

        try {
            const errores:ValidationError[] = await validate(mascotaValida)
            if(errores.length > 0){
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            }else{
                const mensajeCorrecto = {
                    mansaje: 'Se creo correctamente'
                }
                return mensajeCorrecto
            }
        }catch (e) {
            console.error(e);
            throw new BadRequestException('Error validando');
        }

        console.log('Parametros de cuerpo',parametrosCuerpo);
        return 'Registro creado';
    }

    // 1 Cookie Insegura
    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //request o peticion
        @Res() res //response o respuesta
    ){
        res.cookie('galleta insegura', //nombre
            'Yo tambien' //valor
        );

        const mensaje = {
            mensaje:'ok'
        };
        res.send(mensaje);
    }

    // 2 Cookie Segura
    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, //request o peticion
        @Res() res //response o respuesta
    ){
        res.cookie('galleta segura', //nombre
            'Web :3', //valor
            {
                secure: true
            }
        );

        const mensaje = {
            mensaje:'ok'
        };
        res.send(mensaje);
    }

    // 3 Mostrar Cookies
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


    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res
    ){
        res.cookie('firmada','poliburger',{signed:true});
        const mensaje = {
            mensaje:'ok'
        };
        res.send(mensaje);
    }

    // Para obtener los datos de las cabeceras se usa @Headers() headers - peticion
    // Para poner cabeceras al cliente es con res.header('nombre','valor') - respuesta

}