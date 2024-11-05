import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EngineerSkillsDTO } from './engineer-skills.dto';
import { Type } from 'class-transformer';
import { EngineerDailyEarningDto } from './engineer-dailyearning.dto';

export class CreateRegistrationDto {
  @ApiProperty({
    description: '기사님 성함',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: '폰번호',
  })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    description: '거주 지역',
  })
  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty({
    description: '비고',
  })
  @IsString()
  @IsOptional()
  readonly remark?: string;

  @ApiProperty({
    description: '기사님 스킬 목록',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EngineerSkillsDTO)
  readonly skills: EngineerSkillsDTO[];

  @ApiProperty({
    description: '수당률',
  })
  @IsString()
  @IsNotEmpty()
  readonly commissionRate: string;

  @ApiProperty({
    description: '주급 지급 요일',
  })
  @IsString()
  @IsNotEmpty()
  readonly payday: string;

  @ApiProperty({
    description: '지급 여부',
    example: false,
  })
  @IsBoolean()
  readonly isPaid: boolean;

  @ApiProperty({
    description: '일급 목록',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EngineerDailyEarningDto)
  readonly dailyEarnings: EngineerDailyEarningDto[];

  @ApiProperty({
    description: '정기 휴무 요일',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly dayoff?: string[];

  @ApiProperty({
    description: '비정기 휴무일',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly holiday?: string[];
}
