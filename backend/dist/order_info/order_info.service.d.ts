import { CreateOrderInfoDto } from './dto/create-order_info.dto';
import { UpdateOrderInfoDto } from './dto/update-order_info.dto';
export declare class OrderInfoService {
    create(createOrderInfoDto: CreateOrderInfoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderInfoDto: UpdateOrderInfoDto): string;
    remove(id: number): string;
}
