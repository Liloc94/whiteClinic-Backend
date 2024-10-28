import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `
    <h1>WhiteClinic Server is running...</h1>
    <button><Link="https://whiteclinic-server-5uxfywibo-deployproject.vercel.app/api-docs">api redirect</Link></button>
    `;
  }
}
