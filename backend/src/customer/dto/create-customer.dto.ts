import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: '예약 날짜',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly bookingDate: Date;

  @ApiProperty({
    description: '예약 시간',
  })
  @IsString()
  @IsNotEmpty()
  readonly orderTime: string;

  @ApiProperty({
    description: '이름',
  })
  @IsString()
  @IsNotEmpty()
  readonly customerName: string;

  @ApiProperty({
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    description: '주소',
  })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    description: '특이사항',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly remark?: string;
}
