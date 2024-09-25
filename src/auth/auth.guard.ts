import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

// 가드는 filter나 pipe보다는 먼저 실행되나 가드 내에서 응답에 쿠키를 설정할 수는 없음 기존에 쿠키를 설정해 두었으면 쿠키가 있는 요청을 받을 수 있을 뿐
@Injectable()
export class CookieGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // 쿠키에 로그인 정보 담겨있으면 그냥 인증처리 성공
        if(request.cookies['login']) {
            console.log("req.cookies['login'] 통과");
            return true;
        }
        // 쿠키에 로그인 정보 없는데 email이나 password 중 하나라도 없으면 즉시 인증처리 거부
        else if(!request.body.email || !request.body.password) {
            return false;
        }
        
        // service의 메서드로 db의 정보를 받아와서 비밀번호 제외 정보 반환
        const userInfo = await this.authService.validateUser(request.body.email, request.body.password);
        // 실패시 인증처리 거부
        if(!userInfo) {
            return false;
        }     
        console.log('request.user = ', request.user);
        request.user = userInfo; // request에 use라는 속성이 있나?
        return true;
    }
}