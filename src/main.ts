import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 유효성 검증, 전역 파이프에 validationPipe 객체 추가
import { ValidationPipe } from '@nestjs/common';
// HTTP 요청의 헤더에서 쿠키를 읽어올 수 있도록 NestApplication의 설정을 변경
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
