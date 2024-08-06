import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';
import { BoardReadUserReqDto } from './dto/req/board.read.user.req.dto';
import { BoardEditReqDto } from './dto/req/board.edit.req.dto';
import { BoardDeleteReqDto } from './dto/req/board.delete.req.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post('write')
  async boardWrite(@Body() writeInfo: BoardWriteReqDto) {
    return this.boardService.boardWrite(writeInfo);
  }
  @Get('read')
  async boardReadByUserIndex(@Query() readInfo: BoardReadUserReqDto) {
    return this.boardService.boardReadByUserIndex(readInfo);
  }
  @Patch('edit')
  async boardEdit(@Body() editInfo: BoardEditReqDto) {
    return this.boardService.boardEdit(editInfo);
  }
  @Delete('delete')
  async boardDelete(@Query() deleteInfo: BoardDeleteReqDto) {
    return this.boardService.boardDelete(deleteInfo);
  }
}
