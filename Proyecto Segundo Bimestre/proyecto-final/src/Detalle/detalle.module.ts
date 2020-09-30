import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleEntity} from "./detalle.entity";
import {DetalleController} from "./detalle.controller";
import {DetalleService} from "./detalle.service";
import {FacturaEntity} from "../Factura/factura.entity";
import {VideojuegoEntity} from "../Videojuego/videojuego.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                FacturaEntity,
                VideojuegoEntity,
                DetalleEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        DetalleController
    ],
    providers: [
        DetalleService
    ],
    exports: [
        DetalleModule
    ]
})

export class DetalleModule {

}