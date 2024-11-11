import { Engineer } from './engineer.entity';
import { WeekDays } from 'src/engineer-registration/entities/WeekDays.entity';
export declare class EngineerDayoff {
    engineerId: number;
    weekdayId: number;
    engineer: Engineer;
    weekday: WeekDays;
}
