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
    Query
} from "@nestjs/common";

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
    parametrosCuerpo(
        @Body() parametrosCuerpo
    ){
        console.log('Parametros de cuerpo',parametrosCuerpo);
        return 'Registro creado';
    }

}