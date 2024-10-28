import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `
    <h1>WhiteClinic Server is running...</h1>
    <a href="/api-docs">GO API DOCS</a>
    `;
  }
}
