import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';
import { UserEntity } from '../entity/user.entity';
import { BoardReadUserReqDto } from './dto/req/board.read.user.req.dto';
import { BoardEditReqDto } from './dto/req/board.edit.req.dto';
import { BoardDeleteReqDto } from './dto/req/board.delete.req.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
    private jwtService: JwtService,
  ) {}
  async boardWrite(writeInfo: BoardWriteReqDto, request: Request) {
    const user = new UserEntity();
    user.index = request['user'].index;
    const board = new BoardEntity();
    board.user = user;
    board.title = writeInfo.title;
    board.content = writeInfo.content;
    if (await this.boardEntity.save(board)) {
      return true;
    }
    this.logger.error('작성 되지 않음');
    return false;
  }
  async boardReadByUserIndex(readInfo: BoardReadUserReqDto) {
    const board: BoardEntity[] = await this.boardEntity.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          username: true,
        },
      },
      where: {
        user: {
          index: readInfo.userIndex,
        },
      },
    });
    if (!board[0]) {
      this.logger.error('게시한 게시글이 없음');
      throw new NotFoundException('해당 회원이 게시한 게시글이 없습니다.');
    }
    return board;
  }

  async boardEdit(editInfo: BoardEditReqDto, request: Request) {
    const board = await this.boardEntity.findOne({
      select: {
        index: true,
      },
      where: {
        index: editInfo.index,
        user: {
          index: request['user'].index,
        },
      },
    });
    if (!board) {
      this.logger.error('수정 할 게시글을 찾지 못함');
      throw new NotFoundException('수정 할 게시글이 없습니다.');
    }
    await this.boardEntity.update(board, editInfo);
    return true;
  }

  async boardDelete(deleteInfo: BoardDeleteReqDto, request: Request) {
    const board = await this.boardEntity.findOne({
      select: {
        index: true,
      },
      where: {
        index: deleteInfo.index,
        user: {
          index: request['user'].index,
        },
      },
    });

    if (!board) {
      this.logger.error('삭제할 게시글을 찾지 못함');
      throw new NotFoundException('삭제 할 게시글이 없습니다.');
    }
    await this.boardEntity.delete(board);
    return true;
  }
}
