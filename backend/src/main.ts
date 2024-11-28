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
  config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const port = SERVER_PORT;

  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      validationError: {
        target: false,
        value: true,
      },
      exceptionFactory: (errors) => {
        // console.error('Validation errors:', errors);
        return new BadRequestException('Validation failed : ' + errors);
      },
    }),
  );

  app.enableCors({
    origin: SERVER_URL || LOCAL_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new HttpErrorFilter());

  setupSwagger(app);

  await app.listen(process.env.PORT || port);
}
bootstrap();
