import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {FacturaEntity} from "./factura.entity";

@Injectable()
export class FacturaService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(FacturaEntity)
        private repositorio: Repository<FacturaEntity>
    ) {
    }

    crearUno(nuevaFactura: FacturaEntity) {
        return this.repositorio.save(nuevaFactura) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<FacturaEntity> = {

            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    telefono: Like(`%${textoDeConsulta}%`)
                },
                {
                    email: Like(`%${textoDeConsulta}%`)
                },
                {
                    fechaNacimiento: Like(`%${textoDeConsulta}%`)
                },
                {
                    fechaFactura: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id, { relations: ["detalles"] }) //promesa
    }

    editarUno(facturaEditada: FacturaEntity) {
        return this.repositorio.save(facturaEditada);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}