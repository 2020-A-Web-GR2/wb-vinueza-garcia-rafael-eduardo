import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
      //Aqui van los otros modulos
      HttpJuegoModule
  ],
  controllers: [
      //Controladoes del app module
      AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
