import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
export declare class EngineerController {
    private readonly engineerService;
    constructor(engineerService: EngineerService);
    create(createEngineerDto: CreateEngineerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEngineerDto: UpdateEngineerDto): string;
    remove(id: string): string;
}
