import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  readonly admin_id: string;

  @IsString()
  @IsNotEmpty()
  readonly admin_pw: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
