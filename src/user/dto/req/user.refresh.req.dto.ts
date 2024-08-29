import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshReqDto {
  @ApiProperty({ description: 'refresh토큰' })
  refresh: string;
}
