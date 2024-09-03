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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시판 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: 201,
    description: '게시물 정보가 데이터베이스에 저장 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 401,
    description: '유효한 토큰이지 않거나 토큰이 전달되지 않았음',
  })
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
  @ApiResponse({
    status: 200,
    description: '정상적으로 게시물 정보를 불러옴',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 404,
    description: '입력된 정보로 게시물을 찾지 못함',
  })
  async boardReadByUserIndex(@Query() readInfo: BoardReadUserReqDto) {
    return this.boardService.boardReadByUserIndex(readInfo);
  }
  @ApiOperation({ summary: '게시글 수정' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: '정상적으로 게시물 정보가 수정 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 401,
    description: '유효한 토큰이지 않거나 토큰이 전달되지 않았음',
  })
  @ApiResponse({
    status: 404,
    description: '입력된 정보로 게시물을 찾지 못함',
  })
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
  @ApiResponse({
    status: 200,
    description: '정상적으로 게시물정보가 삭제 됨',
  })
  @ApiResponse({
    status: 400,
    description: '요청 정보에 잘못된 정보가 작성 됨',
  })
  @ApiResponse({
    status: 401,
    description: '유효한 토큰이지 않거나 토큰이 전달 되지 않았음',
  })
  @ApiResponse({
    status: 404,
    description: '입력된 정보로 게시물을 찾지 못함',
  })
  async boardDelete(
    @Query() deleteInfo: BoardDeleteReqDto,
    @Request() request: Request,
  ) {
    return this.boardService.boardDelete(deleteInfo, request);
  }
}
