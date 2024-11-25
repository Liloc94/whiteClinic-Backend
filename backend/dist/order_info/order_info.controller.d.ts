import { StreamableFile } from '@nestjs/common';
import { OrderInfoService } from './order_info.service';
import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
import { ExcelService } from 'src/makeExcel.service';
export declare class OrderInfoController {
    private readonly orderInfoService;
    private readonly excelService;
    constructor(orderInfoService: OrderInfoService, excelService: ExcelService);
    create(createOrderInfoDto: CreateOrderInfoDto): Promise<{
        savedOrderInfo: any;
        savedCustomer: any;
    }>;
    findAll(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findOne(id: string): Promise<import("./entities/order_info.entity").Order[]>;
    downloadOrderExcel(): Promise<StreamableFile>;
    update(id: string, updateOrderInfoDto: UpdateOrderInfoDto): Promise<void>;
    remove(id: string): Promise<void>;
}
