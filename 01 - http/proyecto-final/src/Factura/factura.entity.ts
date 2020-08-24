import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {DetalleEntity} from "../Detalle/detalle.entity";

@Entity('factura')
export class FacturaEntity{

    @Index(
        ['nombre', 'telefono','email'],
        {unique:true}
    )

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

    @Column({
        name: 'fecha_nacimiento',
        type: 'date'
    })
    fechaNacimiento:string

    @Column({
        name: 'fecha_factura',
        type: 'date'
    })
    fechaFactura:string

    @ManyToOne(
        type => UsuarioEntity, //Que entidad nos relacionamos
        usuario => usuario.facturas //Campo con el que nos relacionamos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle => detalle.factura
    )
    detalles:DetalleEntity[]

}
