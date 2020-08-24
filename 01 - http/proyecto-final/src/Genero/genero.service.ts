import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GeneroEntity} from "./genero.entity";

@Injectable()
export class GeneroService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(GeneroEntity)
        private repositorio: Repository<GeneroEntity>
    ) {
    }

}