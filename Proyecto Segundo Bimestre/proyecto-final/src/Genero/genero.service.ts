import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {GeneroEntity} from "./genero.entity";

@Injectable()
export class GeneroService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(GeneroEntity)
        private repositorio: Repository<GeneroEntity>
    ) {
    }

    crearUno(nuevoGenero: GeneroEntity) {
        return this.repositorio.save(nuevoGenero) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<GeneroEntity> = {

            where:[
                {
                    descripcion: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(generoEditado: GeneroEntity) {
        return this.repositorio.save(generoEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}