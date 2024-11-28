import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  readonly adminID: string;

  @IsString()
  @IsNotEmpty()
  readonly adminPW: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
