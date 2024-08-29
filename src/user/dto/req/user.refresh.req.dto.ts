import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshReqDto {
  @ApiProperty({ description: '이름' })
  refresh: string;
}