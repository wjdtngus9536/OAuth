import { CanActivate ,ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// const LocalStrategy = require('passport-local'); // AuthGuard('local') 대신 이걸로 사용 가능?

Injectable()
export class LoginGuard extends AuthGuard('local') { // 패스포트를 편하게 사용할 수 있도록 제공된 @nestjs/passport 라이브러리로 passport-local 모듈을 사용하는 방법
    async canActivate(context: ExecutionContext): Promise<boolean> { 
        // ExecutionContext: 가드는 요청의 실행 컨텍스트에 접근할 수 있어 특정 사용자 정보나 요청 데이터를 활용해 로직을 구현할 수 있음
        // 부모 canActivate가 어떻게 구성 되어있는지 전혀 모르는데 괜찮나? >> 해당 메서드는 아직 구현하지 않았음, local.strategy.ts 파일에서 작성예정
        // passport-local의 로직을 구현한 메서드이므로 username과 password로 인증하는 모듈
        // 내부에 service의 validateUser와 같이 email로 db에서 읽어와 비밀번호가 일치하면 userInfo를 return해주는 메서드가 있고 userInfo를 req의 속성에 추가하여 세션 id를 쿠키에 추가하고자 하는 핸들러 메서드에 넘겨준다.
        // super.canActivate를 실행하는 순서도 영향을 끼친다. local.strategy의 validate가 user정보를 return해줘야 
        // super.logIn(request)함수 호출 후 실행되느 serealizeUser 메서드의 user 파라미터에 user.email 속성을 채워줄 수 있기 때문에
        const result = (await super.canActivate(context)) as boolean;
        
        // 로컬 스트래티지 실행
        const request = context.switchToHttp().getRequest();
        
        // 세션 저장, 세션을 저장하고 꺼내오는 방법은 session.serializer.ts 파일에 작성
        await super.logIn(request);
        
        // 가드의 반환값은 boolean
        return result;
    }
}



// 로그인 후 인증이 되어있는지 확인할 때 사용
@Injectable()
export class AuthenticatedGuard implements CanActivate {
/* 
세션에 데이터를 저장하고 돌려주는 응답값에 connect.sid라는 이름의 쿠키를 만들게 되는데
이후의 요청에 쿠키값을 같이 전송하면 세션에 있는 값을 읽어서 인증 여부를 확인할 때 사용하는 가드 
*/
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();  
        console.log('request.session =', request.session);

        const temp = request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인
        return temp
    }
}

