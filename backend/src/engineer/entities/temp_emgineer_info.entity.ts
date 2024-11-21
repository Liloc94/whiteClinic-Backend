import { PartialType } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { Engineer } from './engineer.entity';

@Entity('temp_engineer_info')
export class TempEngineer extends PartialType(Engineer) {}
