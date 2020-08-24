import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {VideojuegoEntity} from "./videojuego.entity";

@Injectable()
export class VideojuegoService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(VideojuegoEntity)
        private repositorio: Repository<VideojuegoEntity>
    ) {
    }

}