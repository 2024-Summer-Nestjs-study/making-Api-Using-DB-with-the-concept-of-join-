import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BoardReadUserReqDto {
  @IsNotEmpty()
  @ApiProperty({ description: '찾을 유저 번호' })
  userIndex: number;
}
