import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Entity('rol')
export class RolEntity{

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
        type => UsuarioEntity,
        usuario => usuario.rol
    )
    usuarios:UsuarioEntity[];

}
