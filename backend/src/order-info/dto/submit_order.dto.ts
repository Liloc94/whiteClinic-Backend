import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SubmitOrderDto {
  @ApiProperty({ description: '고유 아이디' })
  @IsNumber()
  order_id: number;

  @ApiProperty({ description: '예약일자' })
  @IsString()
  order_date: string;

  @ApiProperty({ description: '고객성함' })
  @IsString()
  customer_name: string;

  @ApiProperty({ description: '연락처' })
  @IsString()
  customer_contact: string;

  @ApiProperty({ description: '방문주소' })
  @IsString()
  customer_addr: string;

  @ApiProperty({ description: '특이사항' })
  @IsString()
  customer_remark?: string;

  @ApiProperty({ description: '입금여부' })
  @IsBoolean()
  isPayed: boolean;

  @ApiProperty({ description: '예약금' })
  @IsNumber()
  bookingFee: number;

  @ApiProperty({
    description: '결제방식',
    enum: ['계좌이체', '카드결제', '숨고페이', '현금결제'],
  })
  @IsString()
  paymentType: string;

  @ApiProperty({
    description: '증빙서류',
    enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
  })
  @IsString()
  recieptDocs: string;

  @ApiProperty({ description: '발행여부' })
  @IsBoolean()
  isIssued: boolean;
}
