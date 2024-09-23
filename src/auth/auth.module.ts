import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// @Injectable()이 붙어있는 프로바이더를 다른 모듈에서 사용하려면 
// 프로바이더의 module에서 @Module({exports: [UserModule]}) 데코레이터의 속성으로 exports에 프로바이더를 넣어주어야 한다.
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
