import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class EngineerDailyEarningDto {
  @ApiProperty({
    description: '일자',
  })
  @IsDateString()
  readonly date: string;

  @ApiProperty({
    description: '일급 총액',
  })
  @IsNumber()
  readonly dailyAmount: number;
}
