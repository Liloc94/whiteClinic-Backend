import { Readable } from 'stream';
export declare class ExcelService {
    generateExcel(data: any[]): Promise<Buffer>;
    catch(error: any): void;
    createExcelStream(data: any[]): Promise<Readable>;
}
