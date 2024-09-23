import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// 서비스에서 사용하는 리포지토리를 모듈에 등록해야 함, 
// 리포지토리를 모듈에 등록하지 않으면 서비스에서 리포지토리를 찾을 수 없어서 서버 기동 시 에러가 나게 됨
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './use.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
