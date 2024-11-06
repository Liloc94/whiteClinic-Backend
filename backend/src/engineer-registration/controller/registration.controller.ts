import { Controller, Post, Body } from '@nestjs/common';
import { RegistrationService } from '../service/registration.service';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('registration')
@ApiTags('기사정보 등록 API')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('engineer')
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }
}
