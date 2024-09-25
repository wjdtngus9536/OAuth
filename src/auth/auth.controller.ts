import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { CookieGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }

    // 쿠키나 세션 데이터 확인없이 db 정보를 통해서만 로그인하고 7일간 쿠키에 저장되도록 설정
    @Post('login')
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);
        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                // maxAge: 0
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
        }
        return res.send({ message: 'login success' });
    }


/***********************
 * 쿠키를 이용한 인증
 ***********************/

    @UseGuards(CookieGuard)
    @Post('cookie-login')
    async cookieLogin(@Request() req, @Response() res) {
        // 요청에 쿠키 정보가 없어졌지만 가드를 통해 받은 user라는 속성은 갖고 있다면 다시 응답값에 쿠키 정보 추가
        if (!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), {httpOnly: true, maxAge: 1000 * 10 });
        }

        return res.send({ message: 'cookie-login success' });
    }

    @UseGuards(CookieGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인 된 때만 이 글이 보입니다.';
    }

}
