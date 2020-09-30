import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Entity('desarrolladora')
export class DesarrolladoraEntity{

    @PrimaryGeneratedColumn({
        unsigned:true,
        comment: 'Identificador',
        name: 'id'
    })
    id:number

    @Column({
        name: 'nombre',
        type: 'varchar'
    })
    nombre:string

    @Column({
        name: 'telefono',
        type: 'varchar'
    })
    telefono:string

    @Column({
        name: 'email',
        type: 'varchar'
    })
    email:string

    @OneToMany(
        type => VideojuegoEntity,
        videojuego => videojuego.desarrolladora
    )
    videojuegos:VideojuegoEntity[]

}
