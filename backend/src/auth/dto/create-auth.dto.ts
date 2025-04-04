import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ description: '관리자 아이디' })
  @IsString()
  @IsNotEmpty()
  readonly admin_id: string;

  @ApiProperty({ description: '관리자 비밀번호' })
  @IsString()
  @IsNotEmpty()
  readonly admin_pw: string;
}
