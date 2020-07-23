import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {Deber1Module} from "./Deber1/deber1.module";

@Module({
  imports: [
      //Aqui van los otros modulos
      HttpJuegoModule,
      Deber1Module
  ],
  controllers: [
      //Controladoes del app module
      AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
