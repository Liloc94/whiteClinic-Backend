import { RegistrationService } from '../service/registration.service';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
export declare class RegistrationController {
    private readonly registrationService;
    constructor(registrationService: RegistrationService);
    create(createRegistrationDto: CreateRegistrationDto): Promise<{
        sucess: boolean;
        message: string;
        data: {
            engineer: Promise<{
                name: string;
                phoneNumber: string;
                location: string;
                remark: string;
            } & import("../../engineer-info/entities/engineer.entity").Engineer>;
            skillNames: string[];
            commissionRate: import("../entities/commission_rate.entity").CommissionRates;
            specialHolidays: string[];
            regularHolidays: import("../entities/weekdays.entity").WeekDays;
            paymentDay: import("../entities/weekdays.entity").WeekDays;
        };
    }>;
}
