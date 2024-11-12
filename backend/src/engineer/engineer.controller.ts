import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';

@Controller('engineer')
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  @Post()
  create(@Body() createEngineerDto: CreateEngineerDto) {
    return this.engineerService.create(createEngineerDto);
  }

  @Get()
  findAll() {
    return this.engineerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngineerDto: UpdateEngineerDto) {
    return this.engineerService.update(+id, updateEngineerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineerService.remove(+id);
  }
}
