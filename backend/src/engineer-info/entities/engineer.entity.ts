import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('engineer')
export class Engineer {
  @PrimaryGeneratedColumn({ name: 'engineer_id' })
  engineerId: number; // 일련번호

  @Column({ type: 'varchar', length: 100 })
  name: string; // 데이터 타입을 명시

  @Column({ name: 'phone_number', type: 'varchar', length: 15, unique: true }) // DB 컬럼 이름을 명시적으로 지정
  phoneNumber: string; // 폰번호

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // 큰 텍스트 데이터의 경우
  remark: string; // 특이사항
}
