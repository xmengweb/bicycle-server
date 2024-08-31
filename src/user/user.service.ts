import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as argon2 from 'argon2';
// import { UserQeury } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async findOne(open_id: string) {
    const user = await this.userRepository.findOne({ where: { open_id: open_id } });
    return user;
  }

  async create(user: Partial<UserEntity>) {
    const userTmp = this.userRepository.create(user);
    // 对用户密码使用argon2加密
    userTmp.password = await argon2.hash(userTmp.password);
    const res = await this.userRepository.save(userTmp);
    return res;
  }
}
