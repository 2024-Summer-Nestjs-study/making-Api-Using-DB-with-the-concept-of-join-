import { ApiProperty } from '@nestjs/swagger';

export class UserEditReqDto {
  @ApiProperty({ description: '수정할 이름' })
  username: string;
  @ApiProperty({ description: '수정할 아이디' })
  id: string;
  @ApiProperty({ description: '수정할 비밀번호' })
  pw: string;
}
