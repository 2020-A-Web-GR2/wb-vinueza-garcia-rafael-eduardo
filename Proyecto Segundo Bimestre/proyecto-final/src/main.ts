import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require('express-session');
const express = require('express');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore({logFn: function(){}})
      }),
  );
  app.set('view engine', 'ejs')
  app.use(express.static('publico'))
  await app.listen(3002);
}
bootstrap();
