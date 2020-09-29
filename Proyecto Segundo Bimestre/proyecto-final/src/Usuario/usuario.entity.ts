import {Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FacturaEntity} from "../Factura/factura.entity";
import {RolEntity} from "../Rol/rol.entity";

@Entity('usuario')
export class UsuarioEntity{

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
        name: 'contrasenia',
        type: 'varchar'
    })
    contrasenia:string

    @Column({
        name: 'fecha_nacimiento',
        type: 'date'
    })
    fechaNacimiento:string

    @OneToMany(
        type => FacturaEntity, //Que entidad nos relacionamos
        factura => factura.usuario //Campo con el que nos relacionamos
    )
    facturas : FacturaEntity[];

    @ManyToOne(
        type => RolEntity,
        rol => rol.usuarios
    )
    rol: RolEntity;

}