import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SubmitOrderDto {
  @IsString()
  @ApiProperty({ description: '주문 일자' })
  orderDate: string;
  @IsString()
  @ApiProperty({ description: '고객 성함' })
  customerName: string;
  @IsString()
  @ApiProperty({ description: '고객 연락처' })
  customerPhoneNum: string;
  @IsString()
  @ApiProperty({ description: '고객 주소지' })
  customerAddr: string;
  @IsString()
  @ApiProperty({ description: '고객 특이사항' })
  customerComments: string;
  @IsString()
  @ApiProperty({ description: '결제 방식' })
  customerPayment: string;
  @IsString()
  @ApiProperty({ description: '영수증 종류' })
  customerReciept: string;
  @IsBoolean()
  @ApiProperty({ description: '영수증 발행여부' })
  checkReciept: boolean;
}
