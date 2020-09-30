import {Injectable} from "@nestjs/common";
import {PacienteEntity} from "./paciente.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PacienteService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(PacienteEntity)
        private repositorio: Repository<PacienteEntity>
    ) {
    }

    crearUno(nuevoPaciente: PacienteEntity) {
        return this.repositorio.save(nuevoPaciente) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<PacienteEntity> = {

            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                },
                {
                    telefono: Like(`%${textoDeConsulta}%`)
                },
                {
                    numeroHistorial: Like(`%${textoDeConsulta}%`)
                },
                {
                    fechaInternamiento: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(pacienteEditado: PacienteEntity) {
        return this.repositorio.save(pacienteEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}