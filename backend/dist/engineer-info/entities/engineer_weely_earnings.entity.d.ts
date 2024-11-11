import { Engineer } from './engineer.entity';
import { Calendar } from 'src/order-info/entities/calendar.entity';
export declare class EngineerWeeklyEarnings {
    engineerId: number;
    calendarId: number;
    totalWeeklyAmount: number;
    engineer: Engineer;
    calendar: Calendar;
}
