
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio:Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<UsuarioEntity> = {

            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                }
            ]
        }

        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id, { relations: ["facturas"] }) //promesa
    }

    editarUno(usuarioEditado:UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id) //promesa
    }
}