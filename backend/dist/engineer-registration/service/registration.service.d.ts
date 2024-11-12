import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/update-registration.dto';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Repository, DataSource } from 'typeorm';
import { CommissionRates } from '../entities/commission_rate.entity';
import { WeekDays } from '../entities/weekdays.entity';
export declare class RegistrationService {
    private dataSource;
    private EngineerRepostiory;
    constructor(dataSource: DataSource, EngineerRepostiory: Repository<Engineer>);
    create(dto: CreateRegistrationDto): Promise<{
        sucess: boolean;
        message: string;
        data: {
            engineer: Promise<{
                name: string;
                phoneNumber: string;
                location: string;
                remark: string;
            } & Engineer>;
            skillNames: string[];
            commissionRate: CommissionRates;
            specialHolidays: string[];
            regularHolidays: WeekDays;
            paymentDay: WeekDays;
        };
    }>;
    update(id: number, UpdateRegistrationDto: UpdateRegistrationDto): string;
    remove(id: number): string;
}
