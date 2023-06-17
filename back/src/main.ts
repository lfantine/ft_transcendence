import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' })); // limit size
  app.enableCors({credentials:true, origin: 'http://localhost:3000',})
  await app.listen(4000);
}
bootstrap();
