import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserEditReqDto {
  @ApiProperty({ description: '수정할 이름' })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: '수정할 아이디' })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ description: '수정할 비밀번호' })
  @IsString()
  @IsNotEmpty()
  pw: string;
}
