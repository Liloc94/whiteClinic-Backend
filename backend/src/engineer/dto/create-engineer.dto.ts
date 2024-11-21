import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEngineerDto {
  @ApiProperty({ description: '기사성함' })
  @IsString()
  engineer_name: string;

  @ApiProperty({ description: '연락처' })
  @IsString()
  engineer_phone: string;

  @ApiProperty({ description: '거주지역' })
  @IsString()
  engineer_addr: string;

  @ApiProperty({
    description: '가능품목',
    enum: [
      '벽걸이',
      '원웨이',
      '포웨이',
      '원형',
      '스탠드',
      '실외기',
      '덕트',
      '창문형',
      '통돌이',
      '드럼',
      '빌트인',
      '건조기',
    ],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  engineer_valid_skill: string[];

  @ApiProperty({ description: '기사 특이사항' })
  @IsString()
  engineer_remark: string;

  @ApiProperty({
    description: '수당률',
    enum: [50, 55, 60, 65, 70, 75, 80],
  })
  @IsNumber()
  engineer_commission_rate: number;

  @ApiProperty({
    description: '급여요일',
    enum: [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ],
  })
  @IsString()
  engineer_payday: string;

  @ApiProperty({
    description: '비정기휴무 (복수일 경우 배열 형태로 전달)',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  engineer_holiday: string[];

  @ApiProperty({
    description: '정기휴무',
    enum: [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ],
  })
  @IsString()
  @IsOptional()
  engineer_dayoff: string;
}
