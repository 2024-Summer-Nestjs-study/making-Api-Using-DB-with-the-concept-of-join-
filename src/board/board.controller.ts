import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardWriteReqDto } from './dto/req/board.write.req.dto';
import { BoardReadUserReqDto } from './dto/req/board.read.user.req.dto';
import { BoardEditReqDto } from './dto/req/board.edit.req.dto';
import { BoardDeleteReqDto } from './dto/req/board.delete.req.dto';
import { JwtGuard } from '../jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시판 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @UseGuards(JwtGuard)
  @Post('write')
  async boardWrite(
    @Body() writeInfo: BoardWriteReqDto,
    @Request() request: Request,
  ) {
    return this.boardService.boardWrite(writeInfo, request);
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
