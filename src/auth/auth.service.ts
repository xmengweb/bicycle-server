import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserEntity } from '../user/user.entity';
import { StatEntity } from '../stat/stat.entity';
import { generateRandomPassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body) {
    const wxloginUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const userInfo = (
      await axios.get(wxloginUrl, {
        params: {
          appid: 'WX_APPID',
          secret: 'APP_SECRIT',
          js_code: body.code,
          grant_type: 'authorization_code',
        },
      })
    ).data;
    const open_id = userInfo.openid;
    const username = body.wxUserName;
    const head_pic = body.wxHeadPic;
    const password = generateRandomPassword();
    let user = await this.userRepository.findOne({ where: { open_id: open_id } });
    if (!user) {
      // 副表新增
      const stat = new StatEntity();
      const newuser = new UserEntity();
      newuser.username = username;
      newuser.password = password;
      newuser.open_id = open_id;
      newuser.head_pic = head_pic;
      newuser.stats = stat;
      user = await this.userRepository.save(newuser);
    }
    const payload = { open_id, id: user.user_id };
    return {
      code: 200,
      data: {
        token: this.jwtService.sign(payload),
        user: user,
      },
    };
  }
}
