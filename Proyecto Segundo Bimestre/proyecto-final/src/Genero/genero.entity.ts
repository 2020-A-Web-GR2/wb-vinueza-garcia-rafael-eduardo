import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Entity('genero')
export class GeneroEntity{

    @PrimaryGeneratedColumn({
        unsigned:true,
        comment: 'Identificador',
        name: 'id'
    })
    id:number

    @Column({
        name: 'descripcion',
        type: 'varchar'
    })
    descripcion:string

    @OneToMany(
        type => VideojuegoEntity,
        videojuego => videojuego.genero
    )
    videojuegos:VideojuegoEntity[]

}
