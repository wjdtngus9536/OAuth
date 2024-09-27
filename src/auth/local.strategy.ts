// NestJS에서는 PassportStrategy(Strategy)를 상속받은 클래스에 인증 로직을 작성

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
/* AuthGuard('local')의 super.canActivate(context) 실행 시 LocalStrategy 클래스가 사용됨 */
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' }); // 부모 클래스의 usernameField 속성 값을 'email'로 바꾸면서 초기화, 기본값이 username > email로 변경
    }

    // validate라는 속성이 PassportStrategy(Strategy)라는 믹스인 Strategy 클래스에 있기 때문에 거기서 메서드를 호출할 수 있게 이름을 맞춰서 작성해줘야한다.
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            return null;
        }
        return user;
    }

} 