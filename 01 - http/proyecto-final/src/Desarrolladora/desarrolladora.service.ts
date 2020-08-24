import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";

@Injectable()
export class DesarrolladoraService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(DesarrolladoraEntity)
        private repositorio: Repository<DesarrolladoraEntity>
    ) {
    }

}