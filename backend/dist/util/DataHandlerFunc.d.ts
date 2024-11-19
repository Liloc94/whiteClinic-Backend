import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';
import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { OrderListDto } from 'src/order_info/dto/search-order-list.dto';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
export declare function handleEngineerScheduleData(orderDetails: any[]): Promise<EngineerScheduleDto[]>;
export declare function handleMappedData(): Promise<void>;
export declare function findSkillIdsByNames(skillNames: string[]): Promise<number[]>;
export declare function handleEngineerData(engineerWithSkill: EngineerSkill[]): Promise<any[]>;
export declare function handleOrderDetailsData(orderDetails: CustomerEngineerOrder[]): Promise<OrderListDto[]>;
