import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/setupSwagger';
import { HttpErrorFilter } from './util/HttpErrorFilter';
import { config } from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LOCAL_URL, SERVER_PORT, SERVER_URL } from './util/URLS';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationExceptionFilter } from './util/ValidationExceptionFilter';

async function bootstrap() {
  config(); // .env 파일 로드

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const port = SERVER_PORT;

  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 포함된 경우 에러 발생
      transform: true, // 자동 변환
      enableDebugMessages: true, // 개발 환경에서 상세한 에러 메시지
      validationError: {
        target: false, // 잘못된 값만 포함하여 응답
        value: true, // 실제 잘못된 값도 포함하여 응답
      },
      exceptionFactory: (errors) => {
        console.error('Validation errors:', errors); // 유효성 검사 오류 출력
        return new BadRequestException('Validation failed');
      },
    }),
  );

  app.enableCors({
    origin: SERVER_URL || LOCAL_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new HttpErrorFilter());
  // 전역 파이프 설정

  setupSwagger(app);

  await app.listen(process.env.PORT || port);

  console.log(`server's now runnig on port ${SERVER_PORT}!!`);
}
bootstrap();
