import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EngineerService } from './engineer.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';

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
        engineer_dayoff: ['dayoff & payday 동일', '월요일 ~ 일요일 중 선택'],
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
      return await this.engineerService.createEngineerInfo(createEngineerDto);
    } catch (error) {
      throw new BadRequestException(`${error} 잘못된 요청입니다.`);
    }
  }

  @ApiOperation({
    summary: '전체 기사정보 일괄조회 API',
    description: '모든 기사정보 조회 요청',
  })
  @ApiResponse({ status: 200, description: '기사정보 조회 완료' })
  @Get('searchAllEngineer')
  async findAll() {
    try {
      return await this.engineerService.findAll();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @ApiOperation({
    summary: '전체 기사 스케쥴 일괄조회 API',
    description: '모든 기사들의 스케쥴 정보의 일괄조회를 요청',
  })
  @Get('getAllEngineerSchedule')
  async getAllSchedule() {
    try {
      return await this.engineerService.getAllSchedule();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post('getEngineerdailySalary:id')
  @ApiOperation({
    description: '파라미터로 받은 id를 가진 기사의 일급 정보를 호출한다',
    summary: '특정 기사의 날짜별 일당을 호출한다',
  })
  async getEngineerSalary(@Param('id') id: number) {
    try {
      return await this.engineerService.getDailySalary(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post('saveEngineerWeeklySalary')
  @ApiOperation({
    description: '기사의 주급 및 지급여부를 저장한다',
    summary: '기사 아이디, 주급, 주차, 지급여부 저장,',
  })
  async saveEngineerWeeklySalary(
    @Body() weeklySalary: EngineerWeeklySalaryDto,
  ) {
    try {
      return await this.engineerService.saveEngineerWeeklySalary(weeklySalary);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('getEngineerWeeklyDetail')
  @ApiOperation({
    description: 'id와 날짜 정보를 기준으로 기사주급과 지급여부를 조회한다 ',
    summary:
      '파라미터로 받은 기사 id, 날짜를 기준으로 해당하는 기사의 주급과 지급여부 조회',
  })
  async getEngineerWeeklyDetail(@Body() idDate: EngineerWeeklyDetailDto) {
    return await this.engineerService.getEngineerWeeklyDetail(idDate);
  }

  @Post(':id')
  @ApiOperation({
    description: '파라미터로 전달받은 id의 기사정보를 조회',
    summary: '특정 기사의 정보를 조회한다',
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.engineerService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Patch('updateEngineerInfo:id')
  @ApiOperation({
    description: '전달받은 id의 기사정보를 파라미터 값으로 수정한다',
    summary: '특정 기사의 정보를 업데이트한다.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateEngineerDto: UpdateEngineerDto,
  ) {
    try {
      return await this.engineerService.updateEngineerInfo(
        +id,
        updateEngineerDto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  @ApiOperation({
    description: '파라미터로 전달받은 id를 가진 기사정보를 삭제',
    summary: '특정 기사의 정보를 삭제한다',
  })
  async remove(@Param('id') id: string) {
    return await this.engineerService.removeEngineerInfo(+id);
  }
}
