import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDTO extends PartialType(CreateAuthDto) {
  @ApiProperty({ description: 'admin_id' })
  @IsString()
  @IsNotEmpty()
  readonly admin_id: string;

  @ApiProperty({ description: 'admin_pw' })
  @IsString()
  @IsNotEmpty()
  readonly admin_pw: string;

  @ApiProperty({ description: 'role' })
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
