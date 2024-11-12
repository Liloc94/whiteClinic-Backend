import { OrderResponseDTO } from 'src/order-info/dto/order-response.dto';
export declare class CustomerResponseDTO {
    readonly customerId: number;
    readonly bookingDate: Date;
    readonly orderTime: string;
    readonly customerName: string;
    readonly phoneNumber: string;
    readonly address: string;
    readonly remark?: string;
    readonly orders: OrderResponseDTO;
}
