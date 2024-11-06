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
            } & import("../../engineer-info/entities/engineer-info.entity").Engineer>;
            skillNames: string[];
            commissionRate: import("../entities/commissionRates.entity").CommissionRates;
            specialHolidays: string[];
            regularHolidays: import("../entities/weekDay.entity").WeekDays;
            paymentDay: import("../entities/weekDay.entity").WeekDays;
        };
    }>;
}
