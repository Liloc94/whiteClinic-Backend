import { ApiProperty } from '@nestjs/swagger';

export class EngineerWeeklyDetailDto {
  @ApiProperty({ description: '기사 아이디' })
  engineer_id: number;

  @ApiProperty({ description: '주차 정보' })
  weekly: string;
}
