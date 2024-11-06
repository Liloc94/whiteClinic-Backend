import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer')
@ApiTags('고객 API')
export class CustomerController {}
