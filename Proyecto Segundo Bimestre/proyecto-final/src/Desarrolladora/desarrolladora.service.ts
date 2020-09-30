import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";

@Injectable()
export class DesarrolladoraService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(DesarrolladoraEntity)
        private repositorio: Repository<DesarrolladoraEntity>
    ) {
    }

    crearUno(nuevaDesarrolladora: DesarrolladoraEntity) {
        return this.repositorio.save(nuevaDesarrolladora) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<DesarrolladoraEntity> = {

            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    telefono: Like(`%${textoDeConsulta}%`)
                },
                {
                    email: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(desarrolladoraEditada: DesarrolladoraEntity) {
        return this.repositorio.save(desarrolladoraEditada);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}