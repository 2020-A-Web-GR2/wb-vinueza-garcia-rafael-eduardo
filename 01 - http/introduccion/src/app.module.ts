import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {Deber1Module} from "./Deber1_Examen/deber1.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";

@Module({
  imports: [
      //Aqui van los otros modulos
      HttpJuegoModule,
      UsuarioModule,
      Deber1Module,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name:'default', //nombre conexion
          type: 'mysql', //mysql, postgres
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'root', //Usuario
          password: '123456789', //password
          database: 'test', //base de datos
          entities: [
              //todas las entidades
              UsuarioEntity,
              VacunaEntity,
              MascotaEntity
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
