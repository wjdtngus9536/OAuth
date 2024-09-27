import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }
    
    // 세션에 user 전체 정보를 저장할 때 사용
    serializeUser(user: any, done: Function) {
        done(null, user.email); // user.email을 세션의 id로 설정하여 저장하며, cookie에는 email만 저장
    }

    // 세션에서 정보를 꺼내올 때 사용
    async deserializeUser(payload: any, done: Function): Promise<any> {
        // 세션에서 email을 꺼내오는걸 어디서 호출할까? 질문 3번
        const user = await this.userService.getUser(payload); // payload는 세션에서 꺼내온 값 = email
        if(!user) {
            done(new Error('No User'), null)
            return;
        }
        
        const { password, ...userInfo } = user;
        
        done(null, userInfo);
    }

    
//       // ❹ 세션에서 정보를 꺼내 올 때 사용
//   async deserializeUser(
//     payload: any,
//     done: (err: Error, payload: any) => void,
//   ): Promise<any> {
//     const user = await this.userService.getUser(payload);
//     // ❺ 유저 정보가 없는 경우 done() 함수에 에러 전달
//     if (!user) {
//       done(new Error('No User'), null);
//       return;
//     }
//     const { password, ...userInfo } = user;

//     // ❻ 유저 정보가 있다면 유저 정보 반환
//     done(null, userInfo);
//   }
}