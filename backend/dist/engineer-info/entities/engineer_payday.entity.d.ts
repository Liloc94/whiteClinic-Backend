import { Engineer } from './engineer.entity';
import { WeekDays } from 'src/engineer-registration/entities/WeekDays.entity';
export declare class EngineerPayday {
    paydayId: number;
    engineerId: number;
    weekdayId: number;
    isPay: boolean;
    engineer: Engineer;
    weekday: WeekDays;
}
