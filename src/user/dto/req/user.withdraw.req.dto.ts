import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserWithdrawReqDto {
  @ApiProperty({ description: '동의합니다' })
  @IsString()
  @IsNotEmpty()
  accept: string;
}
