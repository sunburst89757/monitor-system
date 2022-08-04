import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { text } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/report', text());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
