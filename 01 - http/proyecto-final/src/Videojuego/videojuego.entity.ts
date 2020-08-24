import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEntity} from "../Detalle/detalle.entity";
import {GeneroEntity} from "../Genero/genero.entity";
import {DesarrolladoraEntity} from "../Desarrolladora/desarrolladora.entity";

@Entity('videojuego')
export class VideojuegoEntity{

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
        name: 'precio',
        type: 'decimal',
        nullable: false,
        precision:3, //100.         maximos numeros antes
        scale:2 //.01                     maximos decimales despues
    })
    precio:string

    @Column({
        name: 'edad_minima',
        type: 'int',
        nullable: false
    })
    edadMinima:string

    @Column({
        name: 'fecha_lanzamiento',
        type: 'date'
    })
    fechaLanzamiento:string

    @OneToMany(
        type => DetalleEntity,
        detalle => detalle.videojuego
    )
    detalles:DetalleEntity[]

    @ManyToOne(
        type => GeneroEntity,
        genero => genero.videojuegos
    )
    genero:GeneroEntity

    @ManyToOne(
        type => DesarrolladoraEntity,
        desarrolladora => desarrolladora.videojuegos
    )
    desarrolladora:DesarrolladoraEntity

}