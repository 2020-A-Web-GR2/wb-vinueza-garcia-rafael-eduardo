import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post, Put} from "@nestjs/common";

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

}