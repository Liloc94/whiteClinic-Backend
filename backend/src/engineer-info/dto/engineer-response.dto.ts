import { ApiProperty } from '@nestjs/swagger';

export class EngineerResponseDTO {
  @ApiProperty({ description: '고유번호' })
  readonly id: number;

  @ApiProperty({ description: '이름' })
  readonly name: string;

  @ApiProperty({ description: '전화번호' })
  readonly phoneNumber: string;

  @ApiProperty({ description: '거주 지역' })
  readonly location: string;

  @ApiProperty({ description: '비고' })
  readonly remark?: string;

  @ApiProperty({
    description: '기사님 스킬 목록',
  })
  readonly skills: {
    product: string[];
    remark?: string;
  }[];

  @ApiProperty({ description: '수당률' })
  readonly commissionRate: string;

  @ApiProperty({ description: '주급 지급날짜' })
  readonly payday: string;

  @ApiProperty({ description: '지급 여부' })
  readonly isPaid: boolean;

  @ApiProperty({
    description: '일급',
  })
  readonly dailyEarnings: {
    date: string;
    dailyAmount: number;
  }[];

  @ApiProperty({
    description: '정기 휴무 요일 목록',
  })
  dayoffs: string[];

  @ApiProperty({
    description: '비정기 휴무일 목록',
    required: false,
  })
  readonly holidays?: string[];

  constructor(partial: Partial<EngineerResponseDTO>) {
    Object.assign(this, partial);
  }
}
