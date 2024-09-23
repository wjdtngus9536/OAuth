import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 유효성 검증, 전역 파이프에 validationPipe 객체 추가
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
