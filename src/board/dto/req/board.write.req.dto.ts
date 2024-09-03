import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardWriteReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 제목' })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '게시글 내용' })
  content: string;
}
