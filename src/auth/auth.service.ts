import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        // 이미 가입된 유저가 있는 경우의 예외 처리
        const user = await this.userService.getUser(userDto.email);
        if (user) {
            throw new HttpException(
            '해당 유저가 이미 있습니다.',
            HttpStatus.BAD_REQUEST
            );
        }

        // 패스워드 암호화
        const encryptedPassword = hashSync(userDto.password, 10); // 비밀번호를 암호화 처리 10번 한다.
        console.log('패스워드 암호화 결과: ',encryptedPassword);

        // 회원가입 정보 데이터베이스에 저장, 저장 중 에러가 나면 서버 에러 발생
        try {
            const user = await this.userService.createUser({...userDto, password: encryptedPassword});
            user.password = undefined;
            return user;
        } 
        catch (error) {
            throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR); // enum 500
        }

    }

    async validateUser(email: string, password: string) {
        
    }

}
