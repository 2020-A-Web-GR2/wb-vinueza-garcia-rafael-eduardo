import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {DetalleEntity} from "./detalle.entity";

@Injectable()
export class DetalleService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(DetalleEntity)
        private repositorio: Repository<DetalleEntity>
    ) {
    }

    crearUno(nuevoDetalle: DetalleEntity) {
        return this.repositorio.save(nuevoDetalle) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<DetalleEntity> = {

            where:[
                {
                    centidad: Like(`%${textoDeConsulta}%`)
                },
                {
                    precio: Like(`%${textoDeConsulta}%`)
                },
                {
                    precioTotal: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id, { relations: ["videojuego"] }) //promesa
    }

    editarUno(detalleEditado: DetalleEntity) {
        return this.repositorio.save(detalleEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}