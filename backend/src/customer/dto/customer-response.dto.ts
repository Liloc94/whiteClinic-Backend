import { ApiProperty } from '@nestjs/swagger';
import { OrderResponseDTO } from 'src/order-info/dto/order-response.dto';

export class CustomerResponseDTO {
  @ApiProperty({ description: '고유번호' })
  readonly customerId: number;

  @ApiProperty({ description: '예약 날짜' })
  readonly bookingDate: Date;

  @ApiProperty({
    description: '예약 시간',
  })
  readonly orderTime: string;

  @ApiProperty({ description: '고객 이름' })
  readonly customerName: string;

  @ApiProperty({ description: '전화번호' })
  readonly phoneNumber: string;

  @ApiProperty({ description: '주소' })
  readonly address: string;

  @ApiProperty({ description: '특이사항', required: false })
  readonly remark?: string;

  @ApiProperty({
    description: '주문 목록',
    type: [OrderResponseDTO],
  })
  readonly orders: OrderResponseDTO;
}
