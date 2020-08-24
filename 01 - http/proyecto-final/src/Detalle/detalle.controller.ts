import {Controller} from "@nestjs/common";
import {DetalleService} from "./detalle.service";

@Controller('detalle')
export class DetalleController {
    constructor( //Inyeccion de dependencias
        private readonly _detalleService: DetalleService
    ){}
}