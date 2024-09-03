import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRefreshReqDto {
  @ApiProperty({ description: 'refresh토큰' })
  @IsString()
  @IsNotEmpty()
  refresh: string;
}
