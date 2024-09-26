import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }
    
    // 세션에 정보를 저장할 때 사용
    serializeUser(user: any, done: Function) {
        done(null, user.email); //user.email을 세션의 id로 저장
    }

    // 세션에서 정보를 꺼내올 때 사용
    async deserializeUser(payload: any, done: Function): Promise<any> {
        // 세션에서 email을 꺼내오는걸 어디서 호출할까?
        const user = await this.userService.getUser(payload); // payload는 세션에서 꺼내온 값 = email
        if(!user) {
            done(new Error('No User'), null)
            return;
        }
        
        const { password, ...userInfo } = user;
        return userInfo;
    }
}