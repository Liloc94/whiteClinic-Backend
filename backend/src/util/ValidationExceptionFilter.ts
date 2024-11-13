import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 여기서 로그를 찍어 확인
    console.log('BadRequestException caught:', exception.getResponse());

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      error: exception.getResponse(),
      path: request.url,
    });
  }
}
