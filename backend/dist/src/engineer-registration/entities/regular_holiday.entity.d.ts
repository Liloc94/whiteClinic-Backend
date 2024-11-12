import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { WeekDays } from './weekdays.entity';
export declare class RegularHolidays {
    id: number;
    engineerId: number;
    weekdayId: number;
    engineer: Engineer;
    weekday: WeekDays;
}
