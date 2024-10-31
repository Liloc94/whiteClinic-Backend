"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setupSwagger_1 = require("./util/setupSwagger");
const HttpErrorFilter_1 = require("./util/HttpErrorFilter");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const URLS_1 = require("./util/URLS");
const path_1 = require("path");
async function bootstrap() {
    (0, dotenv_1.config)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = URLS_1.SERVER_PORT;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
        prefix: '/public',
    });
    app.enableCors({
        origin: URLS_1.SERVER_URL || URLS_1.LOCAL_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalFilters(new HttpErrorFilter_1.HttpErrorFilter());
    (0, setupSwagger_1.setupSwagger)(app);
    await app.listen(process.env.PORT || port);
    console.log(`Server is running on port:${port}!`);
}
bootstrap();
//# sourceMappingURL=main.js.map