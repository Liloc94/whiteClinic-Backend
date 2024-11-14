import { EngineerScheduleDto } from 'src/engineer/dto/search-engineer-schedule.dto';
export declare function handleOrderDetails(orderDetails: any[]): Promise<EngineerScheduleDto[]>;
export declare function handleMappedData(): Promise<void>;
export declare function findSkillIdsByNames(skillNames: string[]): Promise<number[]>;
