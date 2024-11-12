import { EngineerSkillsDTO } from './engineer-skills.dto';
import { EngineerDailyEarningDto } from './engineer-dailyearning.dto';
export declare class CreateRegistrationDto {
    readonly name: string;
    readonly phoneNumber: string;
    readonly location: string;
    readonly remark?: string;
    readonly skills: EngineerSkillsDTO[];
    readonly commissionRate: string;
    readonly payday: string;
    readonly isPaid: boolean;
    readonly dailyEarnings: EngineerDailyEarningDto[];
    readonly dayoff?: string[];
    readonly holiday?: string[];
}
