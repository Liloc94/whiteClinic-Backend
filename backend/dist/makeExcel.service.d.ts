import { Readable } from 'stream';
export declare class ExcelService {
    generateExcel(data: any[]): Promise<Buffer>;
    catch(error: Error): void;
    createExcelStream(data: any[]): Promise<Readable>;
}
