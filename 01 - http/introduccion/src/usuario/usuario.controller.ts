import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')

export class UsuarioController {
    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Rafael'
        },
        {
            id: 2,
            nombre: 'Juan'
        },
        {
            id: 3,
            nombre: 'Pablo'
        }
    ]
    public idActual = 3;

    constructor( //Inyeccion de dependencias
        private readonly _usuarioService: UsuarioService
    ){

    }

    @Get()
    async mostratTodos(){
        try {
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }

        //return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() ParametrosCuerpo
    ){

        try{
            //VALIDACION DEL CREATE DTO AQUI (DEBER)

            const respuesta = await this._usuarioService.crearUno(ParametrosCuerpo)
            return respuesta
        }catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje:'Error validando datos'
            })

        }

        // const nuevoUsuario = {
        //     id:this.idActual + 1,
        //     nombre: ParametrosCuerpo.nombre
        // };
        // this.arregloUsuarios.push(nuevoUsuario)
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta

        try {
            const respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id))
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }

        if(respuesta){
            return respuesta;
        }else{
            throw new NotFoundException({
                mensaje:'No existen registros'
            })

        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice]

    }

    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )

        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )

        this.arregloUsuarios.splice(indice,1)
        return this.arregloUsuarios[indice];
    }

    //XML
    //JSON

    //Estandar RESTFul
    //Ver Todos
    //GET http://localhost:3001/mascota
    //Ver Uno
    //GET http://localhost:3001/mascota/1
    //Crear uno
    //POST http://localhost:3001/mascota (BODY)
    //Editar Uno
    //PUT http://localhost:3001/mascota/1 (BODY)
    //Eliminar Uno
    //DELETE http://localhost:3001/mascota/1

}