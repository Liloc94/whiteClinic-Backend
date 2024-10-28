import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `
    <h1>WhiteClinic Server is running...</h1>
    <a href="https://whiteclinic-server-5uxfywibo-deployproject.vercel.app/api-docs">GO SERVER API DOCS</a>
    <a href="/api-docs">GO LOCAL API DOCS</a>
    `;
  }
}
