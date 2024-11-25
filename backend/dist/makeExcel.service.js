"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const XLSX = require("xlsx");
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
let ExcelService = class ExcelService {
    async generateExcel(data) {
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
            order.receipt_docs_issued ? '발행됨' : '미발행',
        ]);
        const sheetData = [headers, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const colWidths = rows.map((header, colIndex) => {
            const maxLength = Math.max(...sheetData.map((row) => row[colIndex]?.toString().length + 10 || 0));
            return { wch: Math.max(maxLength, header.length) };
        });
        worksheet['!cols'] = colWidths;
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        return await XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    }
    catch(error) {
        console.error('Error generating Excel:', error);
        throw new Error('엑셀 파일 생성 중 오류가 발생했습니다');
    }
    async createExcelStream(data) {
        const buffer = await this.generateExcel(data);
        return stream_1.Readable.from(buffer);
    }
};
exports.ExcelService = ExcelService;
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)()
], ExcelService);
//# sourceMappingURL=makeExcel.service.js.map