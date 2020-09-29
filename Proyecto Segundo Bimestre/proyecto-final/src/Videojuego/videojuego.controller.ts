import {Controller} from "@nestjs/common";
import {VideojuegoService} from "./videojuego.service";

@Controller('videojuego')
export class VideojuegoController {
    constructor( //Inyeccion de dependencias
        private readonly _videojuegoService: VideojuegoService
    ){}
}