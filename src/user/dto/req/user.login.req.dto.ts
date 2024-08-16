import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginReqDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  pw: string;
}
