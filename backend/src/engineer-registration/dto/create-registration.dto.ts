import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '기사성함' })
  engineerName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '연락처' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '거주지역' })
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '가능품목' })
  skill: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '특이사항' })
  remark: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '수당률' })
  commissionRate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '급여요일' })
  paymentDay: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비정기휴무등록' })
  specialHoliday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '정기휴무' })
  regularHoliday: string;
}
