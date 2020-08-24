import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FacturaEntity} from "./factura.entity";
import {FacturaController} from "./factura.controller";
import {FacturaService} from "./factura.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {DetalleEntity} from "../Detalle/detalle.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity,
                DetalleEntity,
                FacturaEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        FacturaController
    ],
    providers: [
        FacturaService
    ],
    exports: [
        FacturaModule
    ]
})

export class FacturaModule {

}