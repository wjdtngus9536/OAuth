import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 유효성 검증, 전역 파이프에 validationPipe 객체 추가
import { ValidationPipe } from '@nestjs/common';
// HTTP 요청의 헤더에서 쿠키를 읽어올 수 있도록 NestApplication의 설정을 변경
import * as cookieParser from 'cookie-parser';
// 세션을 사용하려면 main.ts 파일에 설정을 추가해야 함
import * as session from 'express-session';
const passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.use(session({
    secret: 'my-session-encrypt-key', // 세션 암호화에 사용되는 키
    resave: false, // HTTP 요청이 올 때마다 세션을 항상 저장할지 여부, 효율이 떨어지므로 false
    saveUninitialized: false, // 세션이 저장되기 전에 빈 값을 저장할지 여부, 인증이 되지 않은 사용자 정보도 빈 값으로 저장하므로 불필요한 공간을 차지하지 않도록 false
    cookie: { maxAge: 1000 * 10 } // 쿠키 유효기간 10초
  }));
  // 패스포트 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
