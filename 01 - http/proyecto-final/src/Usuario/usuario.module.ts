import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {FacturaEntity} from "../Factura/factura.entity";
import {RolEntity} from "../Rol/rol.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                FacturaEntity,
                RolEntity,
                UsuarioEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})

export class UsuarioModule {

}