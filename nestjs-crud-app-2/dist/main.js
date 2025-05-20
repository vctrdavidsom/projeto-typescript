"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Configuração do Swagger
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Delivery de Frutas')
        .setDescription('API para sistema de delivery de frutas')
        .setVersion('1.0')
        .addTag('products', 'Endpoints relacionados a produtos')
        .addTag('categories', 'Endpoints relacionados a categorias')
        .addTag('orders', 'Endpoints relacionados a pedidos')
        .addTag('deliveries', 'Endpoints relacionados a entregas')
        .addTag('users', 'Endpoints relacionados a usuários')
        .addTag('establishments', 'Endpoints relacionados a estabelecimentos')
        .addTag('coupons', 'Endpoints relacionados a cupons')
        .addTag('payments', 'Endpoints relacionados a pagamentos')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    // Configuração de validação global
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(3000);
}
bootstrap();
