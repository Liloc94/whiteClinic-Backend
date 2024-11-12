import { Injectable } from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';

@Injectable()
export class EngineerService {
  create(createEngineerDto: CreateEngineerDto) {
    return 'This action adds a new engineer';
  }

  findAll() {
    return `This action returns all engineer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engineer`;
  }

  update(id: number, updateEngineerDto: UpdateEngineerDto) {
    return `This action updates a #${id} engineer`;
  }

  remove(id: number) {
    return `This action removes a #${id} engineer`;
  }
}
