import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async userRegister(@Body() userInfo: UserRegisterReqDto) {
    return this.userService.userRegister(userInfo);
  }
}
