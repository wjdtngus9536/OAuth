import { Injectable } from '@nestjs/common';
// 엔티티 생성 후 user.service의 Repository 선언
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './use.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    createUser(user: CreateUserDto) {
        return this.userRepository.save(user);
    }

    async getUser(email: string): Promise<User> {
        const result = await this.userRepository.findOne({
            where: {email},
        });
        return result;
    }

    async updateUser(email: string, _user) {
        const user: User = await this.getUser(email);

        user.username = _user.username;
        user.password = _user.password;

        this.userRepository.save(user);
    }

    deleteUser(email: string) {
        return this.userRepository.delete({email})
    }
}
