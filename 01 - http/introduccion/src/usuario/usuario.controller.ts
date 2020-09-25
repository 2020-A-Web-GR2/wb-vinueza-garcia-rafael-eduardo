import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import {UsuarioEntity} from "./usuario.entity";

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
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
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
        //     (Usuario) => Usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice]

    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;

        try {
            const respuesta = await this._usuarioService.editarUno(usuarioEditado)
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (Usuario) => Usuario.id === Number(parametrosRuta.id)
        // )
        //
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){

        const id = Number(parametrosRuta.id);

        try {
            const respuesta = await this._usuarioService.eliminarUno(id)
            return {
                mensaje:"Registro con id " + id + " eliminado"
            }
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (Usuario) => Usuario.id === Number(parametrosRuta.id)
        // )
        //
        // this.arregloUsuarios.splice(indice,1)
        // return this.arregloUsuarios[indice];
    }

    // Usuario -> Mascotas
    //Mascota -> Vacunas


    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;

        //validar Usuario con dto
        //validar mascota con dto
        //CREAMOS LOS DOS
        let usuarioCreado
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario)
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error creando Usuario'
            })
        }
        if(usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)
            }catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje:'Error creando masacota'
                })
            }
            if(mascotaCreada){
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            }else{
                throw new InternalServerErrorException({
                    mensaje:'Error creando masacota'
                })
            }
        }else{
            throw new InternalServerErrorException({
                mensaje:'Error creando Usuario'
            })
        }
}

    @Get('vista/Usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Rafael';
        res.render(
            'usuario/ejemplo',//Nombre de la vista (archivo)
            { //Parametros de la vista
                nombre:nombreControlador
            }
        )

    }

    @Get('vista/faq')
    vistaFAQ(
        @Res() res
    ){
        res.render('usuario/faq')

    }

    @Get('vista/inicio')
    async vistaInicio(
        @Res() res,
        @Query() parametrosDeConsulta
    ){
        let resultadoEncontrado
        try{
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosDeConsulta.busqueda);
        }catch (e) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }

        if(resultadoEncontrado){
            res.render('usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosDeConsulta
                })
        }else{
            throw new NotFoundException('No se encontraron usuarios')
        }


    }

    @Get('vista/login')
    vistaLogin(
        @Res() res
    ){
        res.render('usuario/login')

    }

    @Get('vista/crear')
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ){
        res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            })

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')

        }catch (e) {

        }
    }

    @Get('vista/editar/:id')
    async editarUsuarioVista(
        @Query() parametrosDeConsulta,
        @Param() parametrosDeRuta,
        @Res() res
    ){
        const id = Number(parametrosDeRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        }catch (e) {
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario')
        }

        if(usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosDeConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        }else{
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }

    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res
    ){
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado')
        }catch (e) {
            console.error(e)
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario')
        }

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