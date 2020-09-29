import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FacturaEntity} from "../Factura/factura.entity";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Entity('detalle')
export class DetalleEntity{

    @PrimaryGeneratedColumn({
        unsigned:true,
        comment: 'Identificador',
        name: 'id'
    })
    id:number

    @Column({
        name: 'cantidad',
        type: 'int',
        nullable: false
    })
    cantidad:string

    @Column({
        name: 'precio',
        type: 'decimal',
        nullable: false
    })
    precio:string

    @Column({
        name: 'precio_total',
        type: 'decimal',
        nullable: false
    })
    precioTotal:string

    @ManyToOne(
        type => FacturaEntity, //Que entidad nos relacionamos
        factura => factura.detalles //Campo con el que nos relacionamos
    )
    factura: FacturaEntity;

    @ManyToOne(
        type => VideojuegoEntity, //Que entidad nos relacionamos
        videojuego => videojuego.detalles //Campo con el que nos relacionamos
    )
    videojuego: VideojuegoEntity;

}
