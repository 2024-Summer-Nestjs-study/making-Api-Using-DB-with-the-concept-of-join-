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
import { JwtGuard } from '../jwt/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRefreshReqDto } from './dto/req/user.refresh.req.dto';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 완료',
  })
  @Post('register')
  async userRegister(@Body() userInfo: UserRegisterReqDto) {
    return this.userService.userRegister(userInfo);
  }
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async userLogin(@Body() loginInfo: UserLoginReqDto) {
    return this.userService.userLogin(loginInfo);
  }
  @UseGuards(JwtGuard)
  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: '회원정보 수정' })
  @Patch('edit')
  async userEdit(
    @Body() editInfo: UserEditReqDto,
    @Request() request: Request,
  ) {
    return this.userService.userEdit(editInfo, request);
  }
  @UseGuards(JwtGuard)
  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: '회원 탈퇴' })
  @Delete('withdraw')
  async userWithdraw(@Request() request: Request) {
    return this.userService.userWithdraw(request);
  }
  @Post('refresh')
  async refreshToken(@Body() refresh: UserRefreshReqDto) {
    return this.userService.refreshToken(refresh);
  }
}
