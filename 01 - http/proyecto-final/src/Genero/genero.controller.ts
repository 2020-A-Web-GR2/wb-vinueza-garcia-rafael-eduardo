import {Controller} from "@nestjs/common";
import {GeneroService} from "./genero.service";

@Controller('genero')
export class GeneroController {
    constructor( //Inyeccion de dependencias
        private readonly _generoService: GeneroService
    ){}
}