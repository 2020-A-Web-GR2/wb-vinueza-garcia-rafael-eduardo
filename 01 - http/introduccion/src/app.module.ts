import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {Deber1Module} from "./Deber1_Examen/deber1.module";
import {UsuarioController} from "./usuario/usuario.controller";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      //Aqui van los otros modulos
      HttpJuegoModule,
      UsuarioModule,
      Deber1Module,
      TypeOrmModule.forRoot({
          name:'default', //nombre conexion
          type: 'mysql', //mysql, postgres
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //usuario
          password: '123456789', //password
          database: 'test', //base de datos
          entities: [
              //todas las entidades
              UsuarioEntity
          ],
          synchronize: true, //actualiza el esquema de la base de datos
          dropSchema: false, //Eliminar datos y el esquema de la base de datos
      })

  ],
  controllers: [
      //Controladoes del app module
      AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
