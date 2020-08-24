import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FacturaEntity} from "./factura.entity";

@Injectable()
export class FacturaService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(FacturaEntity)
        private repositorio: Repository<FacturaEntity>
    ) {
    }

}