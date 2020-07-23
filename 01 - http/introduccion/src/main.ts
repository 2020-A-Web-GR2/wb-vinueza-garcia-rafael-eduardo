import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI LA CONFIGURACION
  * ANTES DEL APP.LISTEN
  */

  //  await app.listen(3000);
  app.use(cookieParser('Me agradan los poliperros'))
  await app.listen(3001);
}
bootstrap();
