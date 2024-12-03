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
        idx: number;
        savedOrderInfo: import("../util/constantTypes").ExtractOrderType & import("./entities/order_info.entity").Order;
        savedCustomer: import("../util/constantTypes").ExtractOrderCustomerType & import("../customer/entities/customer.entity").Customer;
    }>;
    findAll(): Promise<import("./dto/search-order-list.dto").OrderListDto[]>;
    findOne(id: number): Promise<import("./dto/search-schedule-dto").ScheduleInfoDto>;
    downloadOrderExcel(): Promise<StreamableFile>;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<void>;
}
