"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setupSwagger_1 = require("./util/setupSwagger");
const HttpErrorFilter_1 = require("./util/filters/HttpErrorFilter");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const urls_1 = require("./util/constants/urls");
const ValidationExceptionFilter_1 = require("./util/filters/ValidationExceptionFilter");
const compression = require("compression");
function validateEnv() {
    const requiredEnvVars = ['DATABASE_URL', 'PRIVATE_KEY', 'PUBLIC_KEY'];
    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }
}
let app;
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        (0, dotenv_1.config)();
        validateEnv();
        app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        });
        const port = urls_1.SERVER_PORT;
        app.use(compression());
        app.useGlobalFilters(new ValidationExceptionFilter_1.ValidationExceptionFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({
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
                return new common_1.BadRequestException({
                    message: 'Validation failed',
                    errors: messages,
                });
            },
        }));
        app.enableCors({
            origin: urls_1.SERVER_URL || urls_1.LOCAL_URL,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
        app.useGlobalFilters(new HttpErrorFilter_1.HttpErrorFilter());
        (0, setupSwagger_1.setupSwagger)(app);
        await app.listen(process.env.PORT || port);
        logger.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (error) {
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
const handler = async (req, res) => {
    if (!app) {
        await bootstrap();
    }
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    return instance(req, res);
};
exports.handler = handler;
if (process.env.NODE_ENV !== 'production') {
    bootstrap();
}
//# sourceMappingURL=main.js.map