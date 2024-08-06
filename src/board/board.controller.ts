import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';
import { BoardReadUserReqDto } from './dto/req/board.read.user.req.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post('write')
  async boardWrite(@Body() writeInfo: BoardWriteReqDto) {
    return this.boardService.boardWrite(writeInfo);
  }
  @Get('readuser')
  async boardReadByUserIndex(@Query() readInfo: BoardReadUserReqDto) {
    return this.boardService.boardReadByUserIndex(readInfo);
  }
}
