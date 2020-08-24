import {Controller, Get} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";


@Controller('usuario')
export class UsuarioController {

    constructor( //Inyeccion de dependencias
        private readonly _usuarioService: UsuarioService
    ){}

    @Get('get')
    holaMundo(){
        return "Hola Mundo";
    }

}