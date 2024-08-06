import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserEditReqDto } from './dto/req/user.edit.req.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async userRegister(@Body() userInfo: UserRegisterReqDto) {
    return this.userService.userRegister(userInfo);
  }
  @Post('login')
  async userLogin(@Body() loginInfo: UserLoginReqDto) {
    return this.userService.userLogin(loginInfo);
  }
  @Patch('edit')
  async userEdit(@Body() editInfo: UserEditReqDto){
    return this.userService.userEdit(editInfo);
  }
}
