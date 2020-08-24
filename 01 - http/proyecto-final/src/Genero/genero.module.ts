import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GeneroEntity} from "./genero.entity";
import {GeneroController} from "./genero.controller";
import {GeneroService} from "./genero.service";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                VideojuegoEntity,
                GeneroEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        GeneroController
    ],
    providers: [
        GeneroService
    ],
    exports: [
        GeneroModule
    ]
})

export class GeneroModule {

}