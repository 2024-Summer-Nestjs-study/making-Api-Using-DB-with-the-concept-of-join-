import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserEditReqDto } from './dto/req/user.edit.req.dto';
import { BoardEntity } from '../entity/board.entity';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import * as bcrypt from 'bcrypt';
import { UserRefreshReqDto } from './dto/req/user.refresh.req.dto';
import { UserWithdrawReqDto } from './dto/req/user.withdraw.req.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
    private jwtService: JwtService,
  ) {}
  /**회원 가입**/
  async userRegister(userInfo: UserRegisterReqDto) {
    const user = new UserEntity();
    user.username = userInfo.username;
    user.id = userInfo.id;
    user.pw = await bcrypt.hash(userInfo.pw, 10);
    try {
      await this.userEntity.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('중복된 아이디가 있습니다.');
      }
    }
  }
  /**로그인**/
  async userLogin(loginInfo: UserLoginReqDto) {
    const user = await this.userEntity.findOne({
      select: {
        index: true,
        username: true,
        pw: true,
      },
      where: {
        id: loginInfo.id,
      },
    });
    if (!user) throw new BadRequestException('맞지 않는 ID입니다');
    const comparePw = await bcrypt.compare(loginInfo.pw, user.pw);
    if (!comparePw) throw new BadRequestException('맞지 않는 PW입니다');
    const payload = {
      index: user.index.toString(),
    };
    //access 토큰 및 refresh 토근 발급
    const secretA = process.env.ACCESS;
    const secretR = process.env.REFRESH;
    const refresh = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '10m',
    });
    const access = this.jwtService.sign(payload, {
      secret: secretA,
      expiresIn: '100s',
    });
    return {
      access,
      refresh,
    };
  }
  /**회원 정보 수정**/
  async userEdit(editInfo: UserEditReqDto, request: Request) {
    const user = await this.userEntity.findOne({
      select: {
        index: true,
      },
      where: {
        index: request['user'].index,
      },
    });
    if (!user) throw new BadRequestException('로그인 후 이용해 주세요');
    const updateInfo = new UserEntity();
    updateInfo.pw = await bcrypt.hash(editInfo.pw, 10);
    updateInfo.id = editInfo.id;
    updateInfo.username = editInfo.username;
    try {
      await this.userEntity.update(user, updateInfo);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('중복된 아이디가 있습니다.');
      }
    }
    return true;
  }
  /**회원 탈퇴**/
  async userWithdraw(accept: UserWithdrawReqDto, request: Request) {
    if (accept.accept !== '동의합니다') {
      throw new BadRequestException('메세지를 올바르게 입력해주세요');
    }
    const user = await this.userEntity.findOne({
      where: {
        index: request['user'].index,
      },
    });
    if (!user) throw new BadRequestException('회원 정보 삭제 실패');
    const boards = await this.boardEntity
      .createQueryBuilder('board_entity')
      .delete()
      .where('userIndex = :userIndex', { userIndex: user.index })
      .execute();
    await this.userEntity.delete(user);
    return true;
  }
  /**Refresh Token 검토**/
  async refreshToken(refresh: UserRefreshReqDto) {
    const secretR = process.env.REFRESH;
    const secretA = process.env.ACCESS;
    let newpayload;
    try {
      const payload = await this.jwtService.verifyAsync(refresh.token, {
        secret: secretR,
      });
      newpayload = {
        index: payload.index,
      };
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('다시 로그인 하세요');
      }
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token이 아닙니다');
      }
    }
    /**새로운 Access Token 발행**/
    const newAccess = this.jwtService.sign(newpayload, {
      secret: secretA,
      expiresIn: '100s',
    });
    return {
      access: newAccess,
    };
  }
}
