import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../../entity/board.entity';
import { Repository } from 'typeorm';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
  ) {}
  async boardWrite(writeInfo: BoardWriteReqDto) {
    const user = new UserEntity();
    user.index = writeInfo.userIndex;
    const board = new BoardEntity();
    board.user = user;
    board.title = writeInfo.title;
    board.content = writeInfo.content;
    if (await this.boardEntity.save(board)) {
      return true;
    }
    return false;
  }
}
