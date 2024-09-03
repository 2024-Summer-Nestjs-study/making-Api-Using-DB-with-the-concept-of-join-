import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardEditReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '변경할 게시글 번호' })
  index: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '변경할 제목' })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '변경할 내용' })
  content: string;
}
