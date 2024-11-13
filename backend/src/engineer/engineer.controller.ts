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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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
        engineer_valid_skill: [
          '하위 카테고리중 택',
          '벽걸이',
          '원웨이',
          '포웨이',
          '원형',
          '스탠드',
          '실외기',
          '덕트',
          '창문형',
          '통돌이',
          '드럼',
          '빌트인',
          '건조기',
        ],
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

  @Get()
  findAll() {
    return this.engineerService.findAll();
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
