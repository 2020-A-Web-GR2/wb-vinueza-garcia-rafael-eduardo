import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity('db_usuario') //nombre de la tabla Usuario
export class UsuarioEntity{

    @Index(
        ['nombre', 'apellido','cedula'],
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
        type: 'varchar',
        nullable: true
    })
    nombre?:string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true
    })
    apellido?:string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula:string

    @Column({
        name: 'sueldo',
        type: 'decimal',
        nullable: true,
        precision:10, //1000000000.         maximos numeros antes
        scale:4 //.0001                     maximos decimales despues
    })
    sueldo?:string

    @Column({
        name: 'fecha_nacimiento',
        type: 'date',
        nullable: true,
    })
    fechaNacimiento?:string

    @Column({
        name: 'fecha_hora_nacimiento',
        type: 'datetime',
        nullable: true,
    })
    fechaHoraNacimiento?:string;

    @OneToMany(
        type => MascotaEntity, //Que entidad nos relacionamos
        mascota => mascota.usuario //Campo con el que nos relacionamos
    )
    mascotas:MascotaEntity[];

}