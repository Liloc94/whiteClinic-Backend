import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/update-registration.dto';
import { Engineer } from 'src/engineer-info/entities/engineer-info.entity';
import { Repository, DataSource } from 'typeorm';
import { CommissionRates } from '../entities/commissionRates.entity';
import { WeekDays } from '../entities/weekDay.entity';
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
    update(id: number, updateRegistrationDto: UpdateRegistrationDto): string;
    remove(id: number): string;
}
