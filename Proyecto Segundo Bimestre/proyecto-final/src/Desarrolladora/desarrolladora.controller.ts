import {Controller} from "@nestjs/common";
import {DesarrolladoraService} from "./desarrolladora.service";

@Controller('desarrolladora')
export class DesarrolladoraController {
    constructor( //Inyeccion de dependencias
        private readonly _desarrolladoraService: DesarrolladoraService
    ){}
}