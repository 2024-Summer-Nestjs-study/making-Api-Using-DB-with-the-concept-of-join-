import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post('write')
  async boardWrite(@Body() writeInfo: BoardWriteReqDto) {
    return this.boardService.boardWrite(writeInfo);
  }
}
