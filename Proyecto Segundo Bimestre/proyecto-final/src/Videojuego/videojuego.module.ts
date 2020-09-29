import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleEntity} from "../Detalle/detalle.entity";
import {GeneroEntity} from "../Genero/genero.entity";
import {DesarrolladoraEntity} from "../Desarrolladora/desarrolladora.entity";
import {VideojuegoEntity} from "./videojuego.entity";
import {VideojuegoController} from "./videojuego.controller";
import {VideojuegoService} from "./videojuego.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                VideojuegoEntity,
                DetalleEntity,
                GeneroEntity,
                DesarrolladoraEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        VideojuegoController
    ],
    providers: [
        VideojuegoService
    ],
    exports: [
        VideojuegoModule
    ]
})

export class VideojuegoModule {

}