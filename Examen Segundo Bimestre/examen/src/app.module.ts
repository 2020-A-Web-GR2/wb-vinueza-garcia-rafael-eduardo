import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente/paciente.entity";
import {PacienteModule} from "./paciente/paciente.module";

@Module({
  imports: [
      PacienteModule,
      TypeOrmModule.forRoot({
        name:'default', //nombre conexion
        type: 'mysql', //mysql, postgres
        host: 'localhost', //ip
        port: 3306, //puerto
        username: 'root', //Usuario
        password: '123456789', //password
        database: 'examen', //base de datos
        entities: [
          //todas las entidades
            PacienteEntity
        ],
        synchronize: true, //actualiza el esquema de la base de datos
        dropSchema: false, //Eliminar datos y el esquema de la base de datos
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
