import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
export declare class EngineerController {
    private readonly engineerService;
    constructor(engineerService: EngineerService);
    create(createEngineerDto: CreateEngineerDto): Promise<void>;
    findAll(): Promise<any[]>;
    getAllSchedule(): Promise<import("./dto/search-engineer-schedule.dto").EngineerScheduleDto[]>;
    findOne(id: string): string;
    update(id: string, updateEngineerDto: UpdateEngineerDto): string;
    remove(id: string): string;
}
