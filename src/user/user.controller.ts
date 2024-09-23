import { Controller, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { User } from './use.entity';
import { UserService } from './user.service';
// 유효성 검증
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {} // 생성자에서 유저 서비스를 주입받아서 userService 객체에 할당

    @Post('/create')
    async createUser(@Body() user: CreateUserDto) { // request의 body에 있는 내용을 user 객체에 담는다.
        // const isdup = await this.userService.getUser(user.email);
        // console.log(isdup);
        // if(isdup) {
        //     return '중복된 email 입니다.';
        // }
        return this.userService.createUser(user); // 이걸 어디로 반환하는거지?
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) {
        const user = await this.userService.getUser(email);
        return user;
    }

    @Put('/update/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string) {
        return this.userService.deleteUser(email);
    }
}
