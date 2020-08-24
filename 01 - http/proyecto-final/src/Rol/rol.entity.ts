import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

}
