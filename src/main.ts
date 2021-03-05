import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const express = require('express');

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
