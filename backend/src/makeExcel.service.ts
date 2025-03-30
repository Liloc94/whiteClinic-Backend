import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class ExcelService {
  async generateExcel(data: any[]): Promise<Buffer> {
    const headers = [
      '주문 일자',
      '고객 성함',
      '고객 연락처',
      '고객 주소',
      '비고',
      '기사 성함',
      '주문 제품',
      '결제 방법',
      '영수증 종류',
      '영수증 발행여부',
    ];

    const rows = data.map((order) => [
      order.order_date + '시',
      order.customer_name,
      order.customer_phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'),
      order.customer_addr,
      order.customer_remark,
      order.engineer_name,
      order.order_product,
      order.order_payment,
      order.order_receipt_docs,
      order.receipt_docs_issued ? '발행' : '미발행',
    ]);

    // 첫 번째 행에 헤더 추가
    const sheetData = [headers, ...rows];

    // 워크시트 생성
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 각 열에 대한 너비 계산 (자동 조정)
    const colWidths = rows.map((header, colIndex) => {
      // 각 열에서 가장 긴 문자열을 찾기 위해 각 데이터를 확인
      const maxLength = Math.max(
        ...sheetData.map((row) => row[colIndex]?.toString().length + 10 || 0),
      );
      return { wch: Math.max(maxLength, header.length) };
      // `wch`는 글자 수를 기준으로 너비를 설정
    });

    // 워크시트에 열 너비 적용
    worksheet['!cols'] = colWidths;

    // 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // 워크북을 Buffer로 변환
    return await XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
      password: 'whiteclinic',
    });
  }
  catch(error: Error) {
    throw new Error('엑셀 파일 생성 중 오류가 발생했습니다' + error);
  }

  async createExcelStream(data: any[]): Promise<Readable> {
    const buffer = await this.generateExcel(data);
    return Readable.from(buffer);
  }
}
