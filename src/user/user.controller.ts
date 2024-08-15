import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserEditReqDto } from './dto/req/user.edit.req.dto';
import { UserWithdrawDto } from './dto/req/user.withdraw.dto';
import { JwtGuard } from '../jwt/jwt.guard';

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
  @UseGuards(JwtGuard)
  @Patch('edit')
  async userEdit(
    @Body() editInfo: UserEditReqDto,
    @Request() request: Request,
  ) {
    return this.userService.userEdit(editInfo, request);
  }
  @UseGuards(JwtGuard)
  @Delete('withdraw')
  async userWithdraw(@Body() withdrawInfo: UserWithdrawDto) {
    return this.userService.userWithdraw(withdrawInfo);
  }
  @Post('refresh')
  async refreshToken(@Body('refresh') refresh: string) {
    return this.userService.refreshToken(refresh);
  }
}
