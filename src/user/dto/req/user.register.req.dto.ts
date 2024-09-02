import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterReqDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: '아이디' })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  pw: string;
}
