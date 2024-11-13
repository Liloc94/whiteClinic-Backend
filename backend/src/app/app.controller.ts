import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Main App Controller')
@Controller()
export class AppController {
  @ApiOperation({
    summary: '서버 메인페이지 HTML을 반환한다',
    description: 'It returns AppController HTML',
  })
  @Get()
  getHello(): string {
    return `
    <h1>WhiteClinic Server is running...</h1>
    <a href="/api-docs">GO API DOCS</a>
    `;
  }
}
