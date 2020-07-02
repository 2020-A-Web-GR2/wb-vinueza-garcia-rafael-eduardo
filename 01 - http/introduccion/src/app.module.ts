import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      //Aqui van los otros modulos
  ],
  controllers: [
      //Controladoes del app module
      AppController],
  providers: [
      //Servicios del app module
      AppService],
})
export class AppModule {}
