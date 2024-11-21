import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class EngineerWeeklySalaryDto {
  @ApiProperty({ description: '기사 ID' })
  @IsNumber()
  engineer_id: number;

  @ApiProperty({ description: '기사 주급' })
  @IsNumber()
  engineer_weekly_salary: number;

  @ApiProperty({ description: '지급 여부' })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({ description: 'n 주차' })
  @IsString()
  weekly: string;
}
