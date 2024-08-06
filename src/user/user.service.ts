import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}
  async userRegister(userInfo: UserRegisterReqDto) {
    const user = new UserEntity();
    user.username = userInfo.username;
    user.id = userInfo.id;
    user.pw = userInfo.pw;
    if (await this.userEntity.save(user)) {
      return true;
    }
    return false;
  }

  async userLogin(loginInfo: UserLoginReqDto) {
    const user = await this.userEntity.findOne({
      select: {
        username: true,
      },
      where: {
        id: loginInfo.id,
        pw: loginInfo.pw,
      },
    });
    if (!user) throw new HttpException('로그인 실패', HttpStatus.BAD_REQUEST);
    return `${user.username}님 로그인 되셨습니다.`;
  }
}
