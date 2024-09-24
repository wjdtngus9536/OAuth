import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res) { // Request와 Response 모두를 사용해야 하므로 @Body나 @Param이 아닌 @Request 사용, Response 객체는 쿠키를 설정할 때 사용
        // 쿠키에 넣어줄 패스워드를 제외한 userInfo
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);
        if(userInfo) {
            // 쿠키 쓰기
            res.cookie('login', JSON.stringify(userInfo), { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 }); 
            // httpOnly를 true로 설정시 브라우저에서 쿠키를 읽지 못함, 
            // 브라우저에서 쿠키를 읽을 수 있다면 XSS(Cross Site Scripting)등의 공격으로 쿠키가 탈취되는 상황이 발생
            // Document.cookie API를 통해 쿠키를 사용하는 것이 아니라면(쿠키 정보를 브라우저에서 읽지 않아도 된다면) true로 설정하는 편이 보안에 더 유리
        }
        // response를 보내는 역할, 어떤 데이터를 보내는지 파악을 해서 이에 알맞게 Content-type을 지정해준다.
        return res.send({ message: 'login success' });
    }
}
