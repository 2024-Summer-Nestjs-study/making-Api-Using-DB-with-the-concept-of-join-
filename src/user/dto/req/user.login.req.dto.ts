import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '아이디' })
  id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호' })
  pw: string;
}
