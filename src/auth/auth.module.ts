import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// @Injectable()이 붙어있는 프로바이더를 다른 모듈에서 사용하려면 
// 프로바이더의 module에서 @Module({exports: [UserModule]}) 데코레이터의 속성으로 exports에 프로바이더를 넣어주어야 한다.
import { UserModule } from 'src/user/user.module';
// 스트래티지와 세션시리얼라이저를 다른 클래스에서 사용할 수 있게 프로바이더에 등록해주고 PassportModule에 세션을 사용하도록 설정
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
