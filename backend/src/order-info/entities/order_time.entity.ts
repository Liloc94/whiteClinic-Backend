import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_time')
export class OrderTime {
  @PrimaryGeneratedColumn({ name: 'order_time_id' })
  orderTimeId: number;

  @IsString()
  @Column({
    enum: [
      '8시 이전',
      '08:00 ~ 09:00',
      '09:00 ~ 10:00',
      '10:00 ~ 11:00',
      '11:00 ~ 12:00',
      '12:00 ~ 13:00',
      '13:00 ~ 14:00',
      '14:00 ~ 15:00',
      '15:00 ~ 16:00',
      '16:00 ~ 17:00',
      '17:00 ~ 18:00',
      '18:00 ~ 19:00',
      '19시 이후',
    ],
  })
  orderTimeSlot: string;
}
