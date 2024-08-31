import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Request() req): Promise<any> {
    const user = await this.userService.findOne(req.user.open_id);
    const res = {
      code: 1,
      result: user ? user : {},
    };
    //openid获取用户信息
    return res;
  }
  //
  @Post()
  addUser(@Body() dto: CreateUserDto): any {
    //@Body data参数
    // todo 解析Body参数
    return this.userService.create(dto);
  }
}
