import {Controller} from "@nestjs/common";
import {RolService} from "./rol.service";

@Controller('rol')
export class RolController {
    constructor( //Inyeccion de dependencias
        private readonly _rolService: RolService
    ){}
}