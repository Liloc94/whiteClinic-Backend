import { PartialType } from '@nestjs/swagger';
import { CreateEngineerInfoDto } from './create-engineer-info.dto';

export class UpdateEngineerInfoDto extends PartialType(CreateEngineerInfoDto) {}
