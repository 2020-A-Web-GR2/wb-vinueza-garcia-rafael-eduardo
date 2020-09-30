import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException, Param,
    Post,
    Query,
    Res,
    Session, ValidationError
} from "@nestjs/common";
import {PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";
import {PacienteCreateDto} from "./dto/paciente.create-dto";
import {validate} from "class-validator";

@Controller('paciente')

export class PacienteController {

    constructor( //Inyeccion de dependencias
        private readonly _pacienteService: PacienteService
    ){

    }


    @Get('principal')
    async principal(
        @Res() res,
        @Session() session,
        @Query() parametrosDeConsulta
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {

            let resultadoEncontrado
            try{
                resultadoEncontrado = await this._pacienteService.buscarTodos(parametrosDeConsulta.busqueda);
            }catch (e) {
                throw new InternalServerErrorException('Error encontrando usuarios')
            }

            if(resultadoEncontrado){
                res.render('principal',
                    {
                        usuario: session.usuario,
                        arregloPacientes: resultadoEncontrado,
                        parametrosConsulta: parametrosDeConsulta
                    })
            }else{
                throw new NotFoundException('No se encontraron pacientes')
            }
        } else {
            return res.redirect('/login')
        }
    }

    @Get('crear')
    crearPacienteVista(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res
    ){
        const estaLogeado = session.usuario;
        if (estaLogeado) {

            res.render(
                'crear',
                {
                    error: parametrosConsulta.error,
                    nombre: parametrosConsulta.nombre,
                    cedula: parametrosConsulta.cedula,
                    telefono: parametrosConsulta.telefono,
                    numeroHistorial: parametrosConsulta.numeroHistorial,
                    fechaInternamiento: parametrosConsulta.fechaInternamiento
                })
        }else{
            return res.redirect('/login')
        }
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        const pacienteValido = new PacienteCreateDto()
        pacienteValido.nombre = parametrosCuerpo.nombre
        pacienteValido.cedula = parametrosCuerpo.cedula
        pacienteValido.telefono = parametrosCuerpo.telefono
        pacienteValido.numeroHistorial = parametrosCuerpo.numeroHistorial
        pacienteValido.fechaHistorial = new Date(parametrosCuerpo.fechaInternamiento)

        try {
            const errores = await validate(pacienteValido)
            if(errores.length > 0){
                console.error('Errores: ', errores);
                const mensajeError = 'Error validando el paciente, verifique que los datos sean reales y esten correctos'
                return res.redirect('crear?error=' + mensajeError)
            }else{
                let nombreConsulta;
                let cedulaConsulta;
                let numeroHistorialConsulta;
                if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.numeroHistorial) {
                    nombreConsulta = `&nombre=${parametrosCuerpo.nombre}`
                    if (parametrosCuerpo.cedula.length === 10) {
                        cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
                    } else {
                        const mensajeError = 'Cedula incorrecta'
                        return res.redirect('crear?error=' + mensajeError + nombreConsulta)
                    }

                    if (parametrosCuerpo.numeroHistorial.length === 10) {
                        numeroHistorialConsulta = `&numeroHistorial=${parametrosCuerpo.numeroHistorial}`
                    } else {
                        const mensajeError = 'El numero de historial debe ser igual a 10 digitos'
                        return res.redirect('crear?error=' + mensajeError + nombreConsulta)
                    }
                } else {
                    const mensajeError = 'Enviar cedula(10) numeroHistorial(10)'
                    return res.redirect('crear?error=' + mensajeError)
                }
                let respuestaCreacionPaciente;
                try {
                    respuestaCreacionPaciente = await this._pacienteService.crearUno(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error creando paciente'
                    return res.redirect('crear?error=' + mensajeError + nombreConsulta + cedulaConsulta + numeroHistorialConsulta)
                }
                if (respuestaCreacionPaciente) {
                    return res.redirect('/paciente/principal');
                } else {
                    const mensajeError = 'Error creando paciente'
                    return res.redirect('crear?error=' + mensajeError + nombreConsulta + cedulaConsulta + numeroHistorialConsulta);
                }
            }
        }catch (e) {
            console.error('Errores: ', e.message);
            const mensajeError = 'Error validando el paciente, verifique que los datos sean reales y esten correctos'
            return res.redirect('crear?error=' + mensajeError)
        }
    }

    @Get('editar/:id')
    async editarPacienteVista(
        @Query() parametrosDeConsulta,
        @Param() parametrosDeRuta,
        @Res() res
    ){
        const id = Number(parametrosDeRuta.id)
        let pacienteEncontrado;
        try {
            pacienteEncontrado = await this._pacienteService.buscarUno(id)
        }catch (e) {
            console.error(e.message)
            return res.redirect('/paciente/principal?mensaje=Error editando paciente')
        }

        if(pacienteEncontrado){
            return res.render(
                'crear',
                {
                    error: parametrosDeConsulta.error,
                    paciente: pacienteEncontrado
                }
            )
        }else{
            return res.redirect('/paciente/principal?mensaje=Usuario no encontrado')
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res
    ){

        const pacienteValido = new PacienteCreateDto()
        pacienteValido.nombre = parametrosCuerpo.nombre
        pacienteValido.cedula = "1234567891"
        pacienteValido.telefono = parametrosCuerpo.telefono
        pacienteValido.numeroHistorial = parametrosCuerpo.numeroHistorial
        pacienteValido.fechaHistorial = new Date(parametrosCuerpo.fechaInternamiento)

        try {
            const errores = await validate(pacienteValido)
            if(errores.length > 0){
                console.error('Errores: ', errores);
                const mensajeError = 'Error validando el paciente, verifique que los datos sean reales y esten correctos'
                return res.redirect('/paciente/editar/'+parametrosRuta.id+'?error=' + mensajeError)
            }else{
                const pacienteEditado = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    telefono: parametrosCuerpo.telefono,
                    numeroHistorial: parametrosCuerpo.numeroHistorial,
                    fechaInternamiento: parametrosCuerpo.fechaInternamiento,
                } as PacienteEntity;
                try {
                    await this._pacienteService.editarUno(pacienteEditado)
                    return res.redirect('/paciente/principal?mensaje=Paciente editado')
                }catch (e) {
                    console.error(e)
                    return res.redirect('/paciente/principal?mensaje=Error editando paciente')
                }
            }
        }catch (e) {
            console.error('Errores: ', e.message);
            const mensajeError = 'Error validando el paciente, verifique que los datos sean reales y esten correctos'
            return res.redirect('crear?error=' + mensajeError)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try{
            const id = Number(parametrosRuta.id);
            await this._pacienteService.eliminarUno(id)
            return res.redirect('/paciente/principal?mensaje=Paciente eliminado')
        }catch (e) {
            console.log(e.message)
            return res.redirect('/paciente/principal?mensaje=Error al eliminar paciente')
        }
    }

}