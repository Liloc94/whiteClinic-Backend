import { Engineer } from 'src/engineer-info/entities/engineer-info.entity';
import { WeekDays } from './weekDay.entity';
export declare class RegularHolidays {
    id: number;
    engineerId: number;
    weekdayId: number;
    engineer: Engineer;
    weekday: WeekDays;
}
