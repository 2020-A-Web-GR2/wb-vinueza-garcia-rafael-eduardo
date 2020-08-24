import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";
import {DesarrolladoraController} from "./desarrolladora.controller";
import {DesarrolladoraService} from "./desarrolladora.service";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                VideojuegoEntity,
                DesarrolladoraEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        DesarrolladoraController
    ],
    providers: [
        DesarrolladoraService
    ],
    exports: [
        DesarrolladoraModule
    ]
})

export class DesarrolladoraModule {

}