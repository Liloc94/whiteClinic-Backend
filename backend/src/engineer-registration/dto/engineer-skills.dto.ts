import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class EngineerSkillsDTO {
  @ApiProperty({
    description: '청소 가능한 품목',
  })
  @IsArray()
  @IsString({ each: true })
  product: string[];

  @ApiProperty({
    description: '특이사항',
  })
  @IsString()
  @IsOptional()
  remark?: string;
}
