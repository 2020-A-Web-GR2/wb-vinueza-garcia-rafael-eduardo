import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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
    @Get()
    mostratTodos(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() ParametrosCuerpo
    ){
        const nuevoUsuario = {
            id:this.idActual + 1,
            nombre: ParametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario)
        this.idActual = this.idActual + 1;
        return nuevoUsuario
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice]

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