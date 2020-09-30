import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VideojuegoEntity} from "./videojuego.entity";
import {FindManyOptions, Like, Repository} from "typeorm";


@Injectable()
export class VideojuegoService {

    constructor( //Inyeccion de dependencias
        @InjectRepository(VideojuegoEntity)
        private repositorio: Repository<VideojuegoEntity>
    ) {
    }

    crearUno(nuevoVideojuego: VideojuegoEntity) {
        return this.repositorio.save(nuevoVideojuego) //promesa
    }

    buscarTodos(textoDeConsulta?:string) {

        if(!textoDeConsulta){
            textoDeConsulta = ""
        }

        const consulta: FindManyOptions<VideojuegoEntity> = {
            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    precio: Like(`%${textoDeConsulta}%`)
                },
                {
                    fechaLanzamiento: Like(`%${textoDeConsulta}%`)
                }
            ]
        }
        return this.repositorio.find(consulta) //promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id, { relations: ["genero", "desarrolladora"] }) //promesa
    }

    editarUno(videojuegoEditado: VideojuegoEntity) {
        return this.repositorio.save(videojuegoEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id) //promesa
    }

}