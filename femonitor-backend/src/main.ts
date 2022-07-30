import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { text } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/report', text());
  await app.listen(3000);
}
bootstrap();
