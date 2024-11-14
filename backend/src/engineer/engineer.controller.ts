import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('기사정보 API')
@Controller('engineer')
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  // 컨트롤러에서 API 설정
  @ApiResponse({
    status: 201,
    description: '기사 정보 저장완료',
    schema: {
      example: {
        engineer_valid_skill: ['벽걸이', '원웨이', '포웨이'],
        engineer_dayoff: [
          'dayoff & payday 동일',
          '월요일',
          '화요일',
          '수요일',
          '목요일',
          '금요일',
          '토요일',
          '일요일',
        ],
        engineer_commission_rate: ['다음 중 택 1', 50, 55, 60, 65, 70, 75, 80],
      },
    },
  })
  @ApiOperation({
    summary: '기사정보 저장 API',
    description: 'Body 에 담긴 정보를 기반으로 DB에 새로운 기사정보를 저장한다',
  })
  @ApiBody({
    description: '기사 정보 생성 요청',
    type: CreateEngineerDto,
  })
  @Post('createEngineer')
  async create(@Body() createEngineerDto: CreateEngineerDto): Promise<void> {
    try {
      console.log('Request received:', createEngineerDto);
      return await this.engineerService.create(createEngineerDto);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({
    summary: '전체 기사정보 일괄조회 API',
    description: '모든 기사정보 조회 요청',
  })
  @ApiResponse({ status: 200, description: '기사정보 조회 완료' })
  @Get('searchAllEngineer')
  async findAll() {
    return await this.engineerService.findAll();
  }

  @ApiOperation({
    summary: '전체 기사 스케쥴 일괄조회 API',
    description: '모든 기사들의 스케쥴 정보의 일괄조회를 요청',
  })
  @Get('getAllEngineerSchedule')
  async getAllSchedule() {
    return await this.engineerService.getAllSchedule();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engineerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEngineerDto: UpdateEngineerDto,
  ) {
    return this.engineerService.update(+id, updateEngineerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engineerService.remove(+id);
  }
}
