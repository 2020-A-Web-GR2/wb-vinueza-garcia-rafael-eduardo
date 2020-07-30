import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio:Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity){

        return this.repositorio.save(nuevoUsuario)

    }

}