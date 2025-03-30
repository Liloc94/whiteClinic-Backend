import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/setupSwagger';
import { HttpErrorFilter } from 'src/util/filters/HttpErrorFilter';
import { config } from 'dotenv';
import { BadRequestException, ValidationPipe, Logger } from '@nestjs/common';
import { LOCAL_URL, SERVER_PORT, SERVER_URL } from 'src/util/constants/urls';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationExceptionFilter } from 'src/util/filters/ValidationExceptionFilter';
import * as compression from 'compression';

function validateEnv() {
  const requiredEnvVars = ['DATABASE_URL', 'PRIVATE_KEY', 'PUBLIC_KEY'];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    );
  }
}

let app: NestExpressApplication;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    config();
    validateEnv();

    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    const port = SERVER_PORT;

    // compression 라이브러리 전역으로 적용
    // 미들웨어 레벨에서 모든 HTTP 응답에 대해 압축 적용
    // 이 라이브러리를 추가하면 자동으로 모든 HTTP 응답이 압축되어 전송되어, 전반적인 애플리케이션 성능이 향상.
    // 특히 API 응답이 큰 경우에 효과적
    app.use(compression());

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
          const messages = errors.map((error) => {
            const constraints = Object.values(error.constraints || {});
            return `${error.property}: ${constraints.join(', ')}`;
          });
          return new BadRequestException({
            message: 'Validation failed',
            errors: messages,
          });
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
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`, error.stack);
    throw error;
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', async () => {
  if (app) {
    await app.close();
  }
  process.exit(0);
});

export const handler = async (req: any, res: any) => {
  if (!app) {
    await bootstrap();
  }
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  return instance(req, res);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
