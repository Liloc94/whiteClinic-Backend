import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('receipt_docs')
export class ReceiptDocs {
  @PrimaryGeneratedColumn({ name: 'receipt_docs_id' })
  receiptDocsId: number;

  @Column({
    type: 'enum',
    enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
    unique: true,
  })
  receiptType: string;
}
