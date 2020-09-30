import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Req,
    Res,
    Session
} from '@nestjs/common';
import {AppService} from './app.service';
import {validate} from "class-validator";
import {UsuarioService} from "./Usuario/usuario.service";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {RolEntity} from "./Rol/rol.entity";
import {UsuarioCreateDto} from "./Usuario/dto/usuario.create-dto";
import {VideojuegoService} from "./Videojuego/videojuego.service";
import {GeneroService} from "./Genero/genero.service";
import {DesarrolladoraService} from "./Desarrolladora/desarrolladora.service";
import {DetalleService} from "./Detalle/detalle.service";
import {FacturaService} from "./Factura/factura.service";
import {FacturaEntity} from "./Factura/factura.entity";
import {DetalleEntity} from "./Detalle/detalle.entity";

let videojuegosCarrito = [];
let usuarioLogueado;

@Controller()
export class AppController {

    constructor(private readonly appService: AppService, private readonly _videojuegoService: VideojuegoService, private readonly _usuarioService: UsuarioService, private readonly _generoService: GeneroService, private readonly _desarrolladoraService: DesarrolladoraService, private readonly _detalleService: DetalleService, private readonly _facturaService: FacturaService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    vistaLogin(
        @Res() res,
        @Query() parametrosDeConsulta
    ) {
        res.render(
            'login',
            {
                parametrosConsulta: parametrosDeConsulta
            }
        )
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() session,
        @Req() request
    ) {
        session.username = undefined;
        session.roles = undefined;
        request.session.destroy();
        return response.redirect('login')
    }

    @Get('registro')
    vistaRegistro(
        @Res() res,
        @Query() parametrosDeConsulta
    ) {
        res.render(
            'registro',
            {
                parametrosConsulta: parametrosDeConsulta
            }
        )
    }

    @Get('tienda')
    async vistaTienda(
        @Res() res,
        @Query() parametrosDeConsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {

            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._videojuegoService.buscarTodos(parametrosDeConsulta.busqueda);
            } catch (e) {
                res.redirect('/tienda?mensaje=No existen videojuegos disponibles')
            }

            res.render(
                'tienda',
                {
                    parametrosConsulta: parametrosDeConsulta,
                    arregloVideojuegos: resultadoEncontrado
                }
            )
        } else {
            return res.redirect('/login')
        }
    }

    @Get('carrito-compras')
    async vistaCarritoCompras(
        @Res() res,
        @Query() parametrosDeConsulta,
        @Session() session
    ) {

        if (parametrosDeConsulta.adicionar) {
            let videojuegoAdicionar
            try {
                videojuegoAdicionar = await this._videojuegoService.buscarUno(parametrosDeConsulta.adicionar);
            } catch (e) {
                res.redirect('/carrito-compras?mensaje=Error al guardar el videojuego')
            }

            videojuegosCarrito.push(videojuegoAdicionar)

            let hash = {};
            videojuegosCarrito = videojuegosCarrito.filter(o => hash[o['id']] ? false : hash[o['id']] = true);
        }

        if (parametrosDeConsulta.eliminar) {
            var i = 0;
            videojuegosCarrito.forEach((objeto) => {
                if (objeto['id'] == parametrosDeConsulta.eliminar) {
                    videojuegosCarrito.splice(i, 1);
                }
                i++
            })
        }

        let totalPagar = 0
        if (videojuegosCarrito.length > 0) {
            videojuegosCarrito.forEach((objeto) => {
                totalPagar = totalPagar + Number(objeto['precio'])
            })
        }
        let totalPagarS = String(totalPagar).substr(0,5)
        const estaLogeado = session.usuario;
        if (estaLogeado) {

            res.render(
                'carrito-compras',
                {
                    parametrosConsulta: parametrosDeConsulta,
                    arregloVideojuegos: videojuegosCarrito,
                    precioTotal: totalPagarS
                }
            )
        } else {
            return res.redirect('/login')
        }
    }

    @Get('ver')
    async verVideojuegoVista(
        @Query() parametrosDeConsulta,
        @Session() session,
        @Res() res
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            try {
                let videojuegosComprados = []
                const id = Number(parametrosDeConsulta.id)
                let videojuegoEncontrado;
                let genero;
                let desarrolladora;
                let comprado = false;
                let usuarioFacturas = await this._usuarioService.buscarUno(usuarioLogueado.id)
                if (usuarioFacturas.facturas.length > 0) {
                    for (const factura of usuarioFacturas.facturas) {
                        let facturaDetalles = await this._facturaService.buscarUno(factura.id);
                        for (const detalle of facturaDetalles.detalles) {
                            let detalleVideojuego = await this._detalleService.buscarUno(detalle.id)
                            let videojuego = await this._videojuegoService.buscarUno(detalleVideojuego.videojuego.id)
                            videojuegosComprados.push(videojuego)
                        }
                    }
                    let hash = {};
                    videojuegosComprados = videojuegosComprados.filter(o => hash[o['id']] ? false : hash[o['id']] = true);

                    for (const videojuegoComprado of videojuegosComprados) {
                        if (videojuegoComprado.id === id) {
                            comprado = true
                        }
                    }
                }

                videojuegoEncontrado = await this._videojuegoService.buscarUno(id)
                genero = await this._generoService.buscarUno(videojuegoEncontrado.genero);
                desarrolladora = await this._desarrolladoraService.buscarUno(videojuegoEncontrado.desarrolladora);

                if (videojuegoEncontrado) {
                    return res.render(
                        'ver',
                        {
                            parametrosConsulta: parametrosDeConsulta,
                            videojuego: videojuegoEncontrado,
                            genero: genero,
                            desarrolladora: desarrolladora,
                            comprado: comprado
                        }
                    )
                } else {
                    return res.redirect('/tienda?mensaje=Videojuego no encontrado')
                }
            } catch (e) {
                console.error(e.message)
                return res.redirect('/tienda?mensaje=Error al mostrar videojuego')
            }
        } else {
            return res.redirect('/login')
        }
    }

    @Get('biblioteca')
    async vistaBiblioteca(
        @Res() res,
        @Query() parametrosDeConsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {

            try {
                let videojuegosComprados = []
                let genero;
                let desarrolladora;
                let usuarioFacturas = await this._usuarioService.buscarUno(usuarioLogueado.id)
                if (usuarioFacturas.facturas.length > 0) {
                    for (const factura of usuarioFacturas.facturas) {
                        let facturaDetalles = await this._facturaService.buscarUno(factura.id);
                        for (const detalle of facturaDetalles.detalles) {
                            let detalleVideojuego = await this._detalleService.buscarUno(detalle.id)
                            let videojuego = await this._videojuegoService.buscarUno(detalleVideojuego.videojuego.id)
                            videojuegosComprados.push(videojuego)
                        }
                    }
                    let hash = {};
                    videojuegosComprados = videojuegosComprados.filter(o => hash[o['id']] ? false : hash[o['id']] = true);
                }

                res.render(
                    'biblioteca',
                    {
                        parametrosConsulta: parametrosDeConsulta,
                        arregloVideojuegos: videojuegosComprados
                    }
                )
            } catch (e) {
                console.log(e);
                res.redirect('/tienda?mensaje=Error al cargar datos')
            }


        } else {
            return res.redirect('/login')
        }
    }

    @Get('perfil')
    async vistaPerfil(
        @Res() res,
        @Query() parametrosDeConsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {

            try {
                let editar = false
                if(parametrosDeConsulta.editar){
                    editar = true
                }

                res.render(
                    'perfil',
                    {
                        parametrosConsulta: parametrosDeConsulta,
                        editar: editar,
                        usuario: usuarioLogueado
                    }
                )
            } catch (e) {
                console.log(e);
                res.redirect('/tienda?mensaje=Error al cargar datos')
            }

        } else {
            return res.redirect('/login')
        }
    }


    @Get('factura')
    async vistaFactura(
        @Res() res,
        @Query() parametrosDeConsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {

            try {
                let factura = new FacturaEntity()
                factura.usuario = usuarioLogueado
                factura.nombre = usuarioLogueado.nombre
                factura.telefono = usuarioLogueado.telefono
                factura.email = usuarioLogueado.email
                factura.fechaNacimiento = usuarioLogueado.fechaNacimiento
                var f = new Date();
                factura.fechaFactura = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDay()

                let respuestaCreacionFactura = await this._facturaService.crearUno(factura);
                let detalles = []

                if (respuestaCreacionFactura) {
                    for (const videojuego of videojuegosCarrito) {
                        let detalle = new DetalleEntity()
                        detalle.factura = factura
                        detalle.videojuego = videojuego
                        detalle.cantidad = '1'
                        detalle.precio = videojuego.precio
                        detalle.precioTotal = String(Number(videojuego.precio) * Number(detalle.cantidad))

                        let respuestaCreacionDetalle = await this._detalleService.crearUno(detalle);

                        if (!respuestaCreacionDetalle) {
                            res.redirect('/carrito-compras?mensaje=Error al crear los detalles')
                        }
                        detalles.push(detalle)
                    }
                } else {
                    res.redirect('/carrito-compras?mensaje=Error al crear la factura')
                }

                videojuegosCarrito = []
                res.render(
                    'factura',
                    {
                        parametrosConsulta: parametrosDeConsulta,
                        factura: factura,
                        usuario: usuarioLogueado,
                        detalles: detalles
                    }
                )
            } catch (e) {
                console.error(e);
                res.redirect('/carrito-compras?mensaje=Error al realizar la compra')
            }
        } else {
            return res.redirect('/login')
        }
    }

    @Post('login')
    async loginPost(
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta,
        @Res() response,
        @Session() session
    ) {

        const usuarioValido = new UsuarioCreateDto()
        usuarioValido.nombre = "Nombre de Prueba";
        usuarioValido.telefono = "1234567890";
        usuarioValido.email = parametrosCuerpo.email;
        usuarioValido.contrasenia = parametrosCuerpo.contrasenia;
        usuarioValido.fechaNacimiento = new Date('2020-01-01');

        try {
            const errores = await validate(usuarioValido)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                response.redirect('login?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto')
            } else {
                let resultadoUsuarios
                try {
                    resultadoUsuarios = await this._usuarioService.buscarTodos("");
                    let coincidencia = false;
                    let esperar = true;
                    while (esperar) {
                        resultadoUsuarios.forEach((usuario) => {
                            if (usuario.email == parametrosCuerpo.email) {
                                if (usuario.contrasenia == parametrosCuerpo.contrasenia) {
                                    coincidencia = true;
                                    usuarioLogueado = usuario
                                    esperar = false
                                }
                            }
                        })
                        esperar = false;
                    }

                    if (coincidencia) {
                        session.usuario = parametrosCuerpo.email;
                        response.redirect('/tienda');
                    } else {
                        response.redirect('/login?mensaje=Credenciales Incorrectas&email=' + parametrosCuerpo.email);
                    }
                } catch (e) {
                    throw new InternalServerErrorException('Error encontrando usuarios')
                }
            }
        } catch (e) {
            console.error(e);
            response.redirect('login?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto')
        }
    }

    @Post('registro')
    async registroPost(
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {

        let nombreUsuario = `&nombre=${parametrosCuerpo.nombre}`;
        let emailUsuario = `&email=${parametrosCuerpo.email}`;
        let telefonoUsuario = `&telefono=${parametrosCuerpo.telefono}`;
        let fechaUsuario = `&fechaNacimiento=${parametrosCuerpo.fechaNacimiento}`;

        //Aqui validar con dto
        const usuarioValido = new UsuarioCreateDto()
        usuarioValido.nombre = parametrosCuerpo.nombre;
        usuarioValido.telefono = parametrosCuerpo.telefono;
        usuarioValido.email = parametrosCuerpo.email;
        usuarioValido.contrasenia = parametrosCuerpo.contrasenia;
        var format = parametrosCuerpo.fechaNacimiento.split("-");
        var fecha = format[0] + '-' + format[1] + '-' + format[2]
        usuarioValido.fechaNacimiento = new Date(fecha);

        try {
            if (parametrosCuerpo.nombre && parametrosCuerpo.telefono && parametrosCuerpo.email && parametrosCuerpo.contrasenia && parametrosCuerpo.confirmarContrasenia && parametrosCuerpo.fechaNacimiento) {
                const errores = await validate(usuarioValido)
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    res.redirect('/registro?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto' + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
                } else {
                    if (parametrosCuerpo.telefono.length != 10) {
                        const mensajeError = 'El telefono debe tener exactamente 10 digitos'
                        return res.redirect('/registro?mensaje=' + mensajeError + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
                    }

                    if (parametrosCuerpo.contrasenia != parametrosCuerpo.confirmarContrasenia) {
                        const mensajeError = 'Las contraseñas no coinciden'
                        return res.redirect('/registro?mensaje=' + mensajeError + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
                    }
                    let respuestaCreacionUsuario;
                    try {
                        let rol = new RolEntity()
                        rol.id = 1
                        let usuario = new UsuarioEntity()
                        usuario.nombre = parametrosCuerpo.nombre
                        usuario.email = parametrosCuerpo.email
                        usuario.telefono = parametrosCuerpo.telefono
                        usuario.contrasenia = parametrosCuerpo.contrasenia
                        usuario.fechaNacimiento = fecha
                        usuario.facturas = []
                        usuario.rol = rol

                        respuestaCreacionUsuario = await this._usuarioService.crearUno(usuario);
                    } catch (error) {
                        console.error(error);
                        const mensajeError = 'Error creando usuario'
                        return res.redirect('/registro?mensaje=' + mensajeError + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
                    }
                    if (respuestaCreacionUsuario) {
                        return res.redirect('/login?mensaje= Usuario Creado Correctamente' + emailUsuario);
                    } else {
                        const mensajeError = 'Error creando usuario'
                        return res.redirect('/registro?mensaje=' + mensajeError + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario);
                    }
                }
            } else {
                const mensajeError = 'Porfavor llenar los campos vacios'
                return res.redirect('/registro?mensaje=' + mensajeError + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
            }
        } catch (e) {
            console.error(e);
            res.redirect('/registro?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto' + nombreUsuario + emailUsuario + telefonoUsuario + fechaUsuario)
        }
    }

    @Post('perfil')
    async editarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res
    ){

        const usuarioValido = new UsuarioCreateDto()
        usuarioValido.nombre = parametrosCuerpo.nombre
        usuarioValido.email = parametrosCuerpo.email
        usuarioValido.contrasenia = '123456789'
        usuarioValido.telefono = parametrosCuerpo.telefono
        var format = parametrosCuerpo.fechaNacimiento.split("-");
        var fecha = format[0] + '-' + format[1] + '-' + format[2]
        usuarioValido.fechaNacimiento = new Date(fecha);

        try {
            const errores = await validate(usuarioValido)
            if(errores.length > 0){
                console.error('Errores: ', errores);
                const mensajeError = 'Error validando el usuario, verifique que los datos sean reales y esten correctos'
                return res.redirect('/perfil?mensaje=' + mensajeError)
            }else{
                const usuarioEditado = {
                    id: Number(usuarioLogueado.id),
                    nombre: parametrosCuerpo.nombre,
                    telefono: parametrosCuerpo.telefono,
                    email: parametrosCuerpo.email,
                    fechaNacimiento: parametrosCuerpo.fechaNacimiento,
                } as UsuarioEntity;
                try {
                    await this._usuarioService.editarUno(usuarioEditado)
                    usuarioLogueado = await this._usuarioService.buscarUno(usuarioLogueado.id)
                    return res.redirect('/perfil?mensaje=Informacion editada correctamente')
                }catch (e) {
                    console.error(e)
                    return res.redirect('/perfil?mensaje=Error editando usuario')
                }
            }
        }catch (e) {
            console.error('Errores: ', e.message);
            const mensajeError = 'Error validando el usuario, verifique que los datos sean reales y esten correctos'
            return res.redirect('perfil?mensaje=' + mensajeError)
        }
    }


}
