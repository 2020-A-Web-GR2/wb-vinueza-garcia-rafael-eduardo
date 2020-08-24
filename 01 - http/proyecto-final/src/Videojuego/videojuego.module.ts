import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VideojuegoService} from "./videojuego.service";
import {VideojuegoController} from "./videojuego.controller";
import {VideojuegoEntity} from "./videojuego.entity";
import {DetalleEntity} from "../Detalle/detalle.entity";
import {GeneroEntity} from "../Genero/genero.entity";
import {DesarrolladoraEntity} from "../Desarrolladora/desarrolladora.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                DetalleEntity,
                GeneroEntity,
                DesarrolladoraEntity,
                VideojuegoEntity
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