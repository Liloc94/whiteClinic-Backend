"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setupSwagger_1 = require("./util/setupSwagger");
const HttpErrorFilter_1 = require("./util/HttpErrorFilter");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const URLS_1 = require("./util/URLS");
const ValidationExceptionFilter_1 = require("./util/ValidationExceptionFilter");
async function bootstrap() {
    (0, dotenv_1.config)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const port = URLS_1.SERVER_PORT;
    app.useGlobalFilters(new ValidationExceptionFilter_1.ValidationExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        enableDebugMessages: true,
        validationError: {
            target: false,
            value: true,
        },
        exceptionFactory: (errors) => {
            return new common_1.BadRequestException('Validation failed : ' + errors);
        },
    }));
    app.enableCors({
        origin: URLS_1.SERVER_URL || URLS_1.LOCAL_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalFilters(new HttpErrorFilter_1.HttpErrorFilter());
    (0, setupSwagger_1.setupSwagger)(app);
    await app.listen(process.env.PORT || port);
}
bootstrap();
//# sourceMappingURL=main.js.map