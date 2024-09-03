import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardDeleteReqDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 번호' })
  index: number;
}
