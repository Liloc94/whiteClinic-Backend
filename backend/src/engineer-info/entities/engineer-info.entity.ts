import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('engineer')
export class Engineer {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number; // 일련번호

  @Column({ name: 'name' }) // 데이터 타입을 명시
  name: string; // 이름

  @Column({ name: 'phone_number' }) // DB 컬럼 이름을 명시적으로 지정
  phoneNumber: string; // 폰번호

  @Column({ name: 'location' })
  location: string; // 지역

  @Column({ name: 'remark' }) // 큰 텍스트 데이터의 경우
  remark: string; // 특이사항
}
