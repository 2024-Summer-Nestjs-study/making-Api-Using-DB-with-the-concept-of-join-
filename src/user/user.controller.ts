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
import { UserWithdrawReqDto } from './dto/req/user.withdraw.req.dto';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원정보가 데이터베이스에 저장 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 409,
    description: '중복된 아이디가 존재 함',
  })
  @Post('register')
  async userRegister(@Body() userInfo: UserRegisterReqDto) {
    return this.userService.userRegister(userInfo);
  }
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: 'access토큰 및 refresh토큰이 생성 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @Post('login')
  async userLogin(@Body() loginInfo: UserLoginReqDto) {
    return this.userService.userLogin(loginInfo);
  }
  @UseGuards(JwtGuard)
  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: '회원정보 수정' })
  @ApiResponse({
    status: 200,
    description: '정상적으로 회원정보가 수정 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 401,
    description: '유효한 토큰이지 않거나 토큰이 전달되지 않았음',
  })
  @ApiResponse({
    status: 409,
    description: '중복된 아이디가 존재 함',
  })
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
  @ApiResponse({
    status: 200,
    description: '정상적으로 회원정보가 삭제 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 401,
    description: '유효한 토큰이지 않거나 토큰이 전달 되지 않았음',
  })
  async userWithdraw(
    @Body() accept: UserWithdrawReqDto,
    @Request() request: Request,
  ) {
    return this.userService.userWithdraw(accept, request);
  }
  @ApiOperation({ summary: 'access토큰 재발급' })
  @Post('refresh')
  async refreshToken(@Body() refresh: UserRefreshReqDto) {
    return this.userService.refreshToken(refresh);
  }
}
