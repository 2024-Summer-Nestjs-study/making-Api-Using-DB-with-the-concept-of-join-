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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시판 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtGuard)
  @Post('write')
  async boardWrite(
    @Body() writeInfo: BoardWriteReqDto,
    @Request() request: Request,
  ) {
    return this.boardService.boardWrite(writeInfo, request);
  }
  @ApiOperation({ summary: '게시글 불러오기' })
  @Get('read')
  async boardReadByUserIndex(@Query() readInfo: BoardReadUserReqDto) {
    return this.boardService.boardReadByUserIndex(readInfo);
  }
  @ApiOperation({ summary: '게시글 수정' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtGuard)
  @Patch('edit')
  async boardEdit(
    @Body() editInfo: BoardEditReqDto,
    @Request() request: Request,
  ) {
    return this.boardService.boardEdit(editInfo, request);
  }
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtGuard)
  @Delete('delete')
  async boardDelete(
    @Query() deleteInfo: BoardDeleteReqDto,
    @Request() request: Request,
  ) {
    return this.boardService.boardDelete(deleteInfo, request);
  }
}
