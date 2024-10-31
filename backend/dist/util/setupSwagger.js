"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('화이트클리닉 프로젝트 API 문서')
        .setDescription('화이트 클리닉 프로젝트 API 문서')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token **_only_**',
    }, 'access-token')
        .addTag('API Docs Lists..')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        customCssUrl: '/swagger-ui.css',
        customJs: '/swagger-ui-bundle.js',
        customfavIcon: '/favicon.png',
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
//# sourceMappingURL=setupSwagger.js.map