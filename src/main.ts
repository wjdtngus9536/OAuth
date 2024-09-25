import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 유효성 검증, 전역 파이프에 validationPipe 객체 추가
import { ValidationPipe } from '@nestjs/common';
// HTTP 요청의 헤더에서 쿠키를 읽어올 수 있도록 NestApplication 설정 변경
import * as cookieParser from 'cookie-parser';
// 세션을 사용하려면 main.ts 파일에 설정을 추가해야 한다.
import session = require('express-session');
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션을 항상 저장
      saveUninitialized: false, // 세션이 저장되기 전에 초기화하지 않은 상태로 세션을 미리 만들어 저장
      cookie: {maxAge: 1000 * 60 * 60 } // 쿠기 유효기간 1시간
    })
  );
  // 패스포트 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
