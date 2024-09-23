import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// 10.1.3 SQLite 데이터베이스 설정
import { TypeOrmModule } from '@nestjs/typeorm';
// 엔티티가 등록이 되어 있어야만 typeorm에서 해당 엔티티에 대한 메타 데이터를 읽을 수 있음
import { User } from './user/use.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nest-auth-test.sqlite',
      entities: [User], // 엔티티(테이블과 매핑하는 @Entity() 데코레이터를 붙인 클래스)로 만드는 객체
      synchronize: true, // 데이터베이스에 스키마를 동기화
      logging: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
