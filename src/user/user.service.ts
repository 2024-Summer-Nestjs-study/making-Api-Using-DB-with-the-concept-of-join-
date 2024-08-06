import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';

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
}
