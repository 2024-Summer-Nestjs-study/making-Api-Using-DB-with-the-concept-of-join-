import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterReqDto } from './dto/req/user.register.req.dto';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserEditReqDto } from './dto/req/user.edit.req.dto';
import { UserWithdrawDto } from './dto/req/user.withdraw.dto';
import { BoardEntity } from '../entity/board.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
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

  async userEdit(editInfo: UserEditReqDto) {
    const user = await this.userEntity.findOne({
      where: {
        index: editInfo.index,
      },
    });
    if (!user)
      throw new HttpException('회원 정보 수정 실패', HttpStatus.BAD_REQUEST);
    await this.userEntity.update(user.index, editInfo);
    return true;
  }
  async userWithdraw(withdrawInfo: UserWithdrawDto) {
    const user = await this.userEntity.findOne({
      where: {
        username: withdrawInfo.username,
        id: withdrawInfo.id,
        pw: withdrawInfo.pw,
      },
    });
    if (!user)
      throw new HttpException('회원 정보 삭제 실패', HttpStatus.BAD_REQUEST);
    const boards = await this.boardEntity
      .createQueryBuilder('board_entity')
      .delete()
      .where('userIndex = :userIndex', { userIndex: user.index })
      .execute();
    console.log(boards);
    await this.userEntity.delete(user);
    return true;
  }
}
