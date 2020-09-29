import {Module} from "@nestjs/common";
import {UsuarioModule} from "./Usuario/usuario.module";
import {VideojuegoModule} from "./Videojuego/videojuego.module";
import {RolModule} from "./Rol/rol.module";
import {GeneroModule} from "./Genero/genero.module";
import {FacturaModule} from "./Factura/factura.module";
import {DetalleModule} from "./Detalle/detalle.module";
import {DesarrolladoraModule} from "./Desarrolladora/desarrolladora.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {VideojuegoEntity} from "./Videojuego/videojuego.entity";
import {RolEntity} from "./Rol/rol.entity";
import {GeneroEntity} from "./Genero/genero.entity";
import {FacturaEntity} from "./Factura/factura.entity";
import {DetalleEntity} from "./Detalle/detalle.entity";
import {DesarrolladoraEntity} from "./Desarrolladora/desarrolladora.entity";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {VideojuegoService} from "./Videojuego/videojuego.service";
import {VideojuegoController} from "./Videojuego/videojuego.controller";
import {GeneroController} from "./Genero/genero.controller";
import {GeneroService} from "./Genero/genero.service";
import {DesarrolladoraService} from "./Desarrolladora/desarrolladora.service";
import {DesarrolladoraController} from "./Desarrolladora/desarrolladora.controller";
import {DetalleController} from "./Detalle/detalle.controller";
import {FacturaController} from "./Factura/factura.controller";
import {DetalleService} from "./Detalle/detalle.service";
import {FacturaService} from "./Factura/factura.service";


@Module({
  imports: [
      UsuarioModule,
      VideojuegoModule,
      RolModule,
      GeneroModule,
      FacturaModule,
      DetalleModule,
      DesarrolladoraModule,
      TypeOrmModule.forFeature(
          [
              VideojuegoEntity,
              GeneroEntity,
              DesarrolladoraEntity,
              DetalleEntity,
              FacturaEntity
          ],
          'default' //Nombre de cadena de conexion
      ),
      TypeOrmModule.forRoot({
          name:'default', //nombre conexion
          type: 'mysql', //mysql, postgres
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //Usuario
          password: '123456789', //password
          database: 'proyecto', //base de datos
          entities: [
              UsuarioEntity,
              VideojuegoEntity,
              RolEntity,
              GeneroEntity,
              FacturaEntity,
              DetalleEntity,
              DesarrolladoraEntity
          ],
          synchronize: true, //actualiza el esquema de la base de datos
          dropSchema: false, //Eliminar datos y el esquema de la base de datos
      }),
  ],
  controllers: [
      AppController, VideojuegoController, GeneroController, DesarrolladoraController, DetalleController, FacturaController],
  providers: [
      AppService, VideojuegoService, GeneroService, DesarrolladoraService, DetalleService, FacturaService],
})
export class AppModule {

}
