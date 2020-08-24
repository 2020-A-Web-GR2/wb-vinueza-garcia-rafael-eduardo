import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * AQUI LA CONFIGURACION
  * ANTES DEL APP.LISTEN
  */

  //  await app.listen(3000);
  app.use(cookieParser('Me agradan los poliperros'))
  app.set('view engine', 'ejs')
  app.use(express.static('publico'))

  await app.listen(3001);
}
bootstrap();
