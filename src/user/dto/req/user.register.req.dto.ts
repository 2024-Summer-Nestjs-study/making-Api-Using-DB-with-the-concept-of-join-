import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterReqDto {
  @ApiProperty({ description: '이름' })
  username: string;
  @ApiProperty({ description: '아이디' })
  id: string;
  @ApiProperty({ description: '비밀번호' })
  pw: string;
}
