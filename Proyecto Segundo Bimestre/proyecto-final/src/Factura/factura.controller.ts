import {Controller} from "@nestjs/common";
import {FacturaService} from "./factura.service";

@Controller('factura')
export class FacturaController {
    constructor( //Inyeccion de dependencias
        private readonly _facturaService: FacturaService
    ){}
}