import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";
import {RolController} from "./rol.controller";
import {RolService} from "./rol.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity,
                RolEntity
            ],
            'default' //Nombre de cadena de conexion
        )
    ],
    controllers: [
        RolController
    ],
    providers: [
        RolService
    ],
    exports: [
        RolModule
    ]
})

export class RolModule {

}