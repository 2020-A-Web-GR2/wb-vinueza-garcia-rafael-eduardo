import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('paciente') //nombre de la tabla Usuario
export class PacienteEntity {

    @Index(
        ['nombre', 'cedula'],
        {unique: true}
    )

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: true
    })
    cedula?: string

    @Column({
        name: 'telefono',
        type: 'varchar',
        nullable: true
    })
    telefono?: string

    @Column({
        name: 'numero_historial',
        type: 'varchar',
        nullable: true
    })
    numeroHistorial?: string

    @Column({
        name: 'fecha_internamiento',
        type: 'date',
        nullable: true,
    })
    fechaInternamiento?:string
}