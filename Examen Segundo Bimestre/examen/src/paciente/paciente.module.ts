import {PacienteController} from "./paciente.controller";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                PacienteEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        PacienteController
    ],
    providers: [
        PacienteService
    ],
})

export class PacienteModule {

}