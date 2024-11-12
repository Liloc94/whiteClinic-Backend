import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
export declare class EngineerService {
    create(createEngineerDto: CreateEngineerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEngineerDto: UpdateEngineerDto): string;
    remove(id: number): string;
}
