import { Controller, Get } from '@nestjs/common';
import { EngineerInfoService } from '../service/engineer-info.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('engineer-info')
@ApiTags('기사정보 API')
export class EngineerInfoController {
  constructor(private readonly engineerInfoService: EngineerInfoService) {}

  // 모든 기사님들의 정보를 보내준다.
  @Get('getAll')
  @ApiOperation({
    summary:
      '기사 이름, 전화번호, 주소, 날짜-급여, 수당률, 스킬, 지급여부,지급일',
    // description: '기사 이름, 전화번호, 주소를 불러온다.',
  })
  async findAll() {
    try {
      const [engineer, engineerPay, engineerPayDay, EngineerCommissionRates] =
        await Promise.all([
          this.engineerInfoService.engineer(),
          this.engineerInfoService.enginnerPay(),
          this.engineerInfoService.engineerPayDay(),
          this.engineerInfoService.engineerCommissionRates(),
        ]);
      return {
        engineer,
        engineerPay,
        engineerPayDay,
        EngineerCommissionRates,
      };
    } catch (error) {
      console.error('잘못된 데이터입니다.', error);
      throw error;
    }
  }
}
